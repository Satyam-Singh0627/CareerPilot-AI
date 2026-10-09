from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional, Dict, Any
from ..ml.matcher import CareerMatcher

router = APIRouter(prefix="/careers", tags=["Careers"])
matcher = CareerMatcher()

@router.get("", response_model=List[Dict[str, Any]])
def list_careers(
    domain: Optional[str] = Query(None, description="Filter by domain"),
    search: Optional[str] = Query(None, description="Search by title, domain, or skill")
):
    careers = matcher.get_all_careers()
    if domain:
        careers = [c for c in careers if c.get("domain", "").lower() == domain.lower()]
    if search:
        s = search.lower()
        careers = [
            c for c in careers 
            if s in c.get("title", "").lower() 
            or s in c.get("domain", "").lower() 
            or any(s in sk.lower() for sk in c.get("core_skills", []))
        ]
    return careers

@router.get("/domains", response_model=List[str])
def list_domains():
    careers = matcher.get_all_careers()
    domains = sorted(list({c.get("domain") for c in careers if c.get("domain")}))
    return domains

@router.get("/{career_id}")
def get_career(career_id: str):
    career = matcher.get_career_by_id(career_id)
    if not career:
        raise HTTPException(status_code=404, detail=f"Career '{career_id}' not found")
    return career
