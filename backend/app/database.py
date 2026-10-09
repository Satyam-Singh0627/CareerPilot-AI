import sqlite3
import json
from contextlib import contextmanager
from typing import Generator, Any
from .config import settings

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@contextmanager
def get_db() -> Generator[sqlite3.Connection, None, None]:
    conn = sqlite3.connect(settings.DATABASE_PATH, timeout=10.0, check_same_thread=False)
    conn.row_factory = dict_factory
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA busy_timeout = 5000;")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Student profiles table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS profiles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT,
            education_level TEXT,
            field_of_study TEXT,
            graduation_year INTEGER,
            current_skills TEXT,     -- JSON array of strings
            target_roles TEXT,       -- JSON array of strings
            interests TEXT,          -- JSON array of strings
            experience_level TEXT,   -- beginner, intermediate, advanced
            bio TEXT,
            preferred_work_style TEXT, -- remote, hybrid, onsite
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Career Recommendations table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS career_recommendations (
            id TEXT PRIMARY KEY,
            profile_id TEXT NOT NULL,
            career_id TEXT NOT NULL,
            title TEXT NOT NULL,
            domain TEXT NOT NULL,
            fit_score REAL NOT NULL,
            breakdown TEXT,          -- JSON object of score breakdown
            skill_gap TEXT,          -- JSON object (missing, matched, partial)
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
        );
        """)

        # Roadmaps table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS roadmaps (
            id TEXT PRIMARY KEY,
            profile_id TEXT NOT NULL,
            career_id TEXT NOT NULL,
            title TEXT NOT NULL,
            total_weeks INTEGER DEFAULT 12,
            milestones TEXT,         -- JSON array of weekly milestone objects
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
        );
        """)

        # Student Progress table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS progress (
            id TEXT PRIMARY KEY,
            profile_id TEXT NOT NULL,
            career_id TEXT NOT NULL,
            completed_skills TEXT,       -- JSON array of strings
            completed_milestones TEXT,   -- JSON array of milestone ids or week numbers
            completed_projects TEXT,     -- JSON array of project titles
            readiness_score REAL DEFAULT 0.0,
            notes TEXT,                  -- JSON notes array
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
        );
        """)

        # Multi-agent chat consultation logs
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_messages (
            id TEXT PRIMARY KEY,
            profile_id TEXT NOT NULL,
            sender TEXT NOT NULL,       -- 'user' or 'agent'
            agent_name TEXT,            -- e.g. 'Orchestrator', 'Career Analysis Agent', etc.
            content TEXT NOT NULL,
            metadata TEXT,              -- JSON extra info
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
        );
        """)
