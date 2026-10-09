import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';

const COMMON_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL',
  'Git', 'HTML5 & CSS3', 'Pandas', 'Machine Learning', 'Docker',
  'Linux / Bash', 'AWS', 'Figma', 'C++', 'Java', 'Tailwind CSS',
  'Data Visualization', 'Scikit-Learn', 'Power BI'
];

const TARGET_ROLE_OPTIONS = [
  'AI & Machine Learning Engineer', 'Data Scientist', 'Data Analyst',
  'Full Stack Web Developer', 'Backend Software Engineer', 'Frontend Engineer',
  'Cloud DevOps Engineer', 'Cybersecurity Analyst', 'UI/UX Product Designer',
  'Mobile App Developer'
];

const INTEREST_OPTIONS = [
  'Artificial Intelligence', 'Data Science & Analytics', 'Web Development',
  'Cloud Computing', 'Cybersecurity', 'User Experience Design',
  'Mobile Apps', 'Open Source Tech', 'Sustainable & Clean Tech'
];

export const OnboardingPage: React.FC = () => {
  const { updateProfile, isLoading, loadDemoProfile, profile, setActiveTab } = useCareerPilot();
  const [step, setStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Neutral empty state for new user, preserving profile data if already set
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    education_level: profile?.education_level || 'Undergraduate',
    field_of_study: profile?.field_of_study || '',
    graduation_year: profile?.graduation_year || 2027,
    current_skills: profile?.current_skills ? [...profile.current_skills] : [],
    target_roles: profile?.target_roles ? [...profile.target_roles] : [],
    interests: profile?.interests ? [...profile.interests] : [],
    experience_level: profile?.experience_level || 'beginner',
    bio: profile?.bio || '',
    preferred_work_style: profile?.preferred_work_style || 'hybrid',
    weekly_hours_available: profile?.weekly_hours_available || 15
  });

  const [customSkill, setCustomSkill] = useState('');

  const toggleSkill = (skill: string) => {
    if (formData.current_skills.includes(skill)) {
      setFormData({
        ...formData,
        current_skills: formData.current_skills.filter((s) => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        current_skills: [...formData.current_skills, skill]
      });
    }
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !formData.current_skills.includes(trimmed)) {
      setFormData({
        ...formData,
        current_skills: [...formData.current_skills, trimmed]
      });
      setCustomSkill('');
    }
  };

  const toggleRole = (role: string) => {
    if (formData.target_roles.includes(role)) {
      setFormData({
        ...formData,
        target_roles: formData.target_roles.filter((r) => r !== role)
      });
    } else {
      setFormData({
        ...formData,
        target_roles: [...formData.target_roles, role]
      });
    }
  };

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1) {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!formData.field_of_study.trim()) {
        setErrorMessage('Please enter your field of study or major (e.g. Computer Science, Information Technology, Data Science).');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (formData.current_skills.length === 0) {
        setErrorMessage('Please select or add at least one technical skill to help us calculate accurate career matches.');
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1) setStep(step - 1);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Full name is required.');
      setStep(1);
      return;
    }
    if (formData.current_skills.length === 0) {
      setErrorMessage('Please add at least one current technical skill.');
      setStep(2);
      return;
    }

    try {
      await updateProfile(formData);
    } catch {
      setErrorMessage('Failed to save profile. Please check your network and try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Top Header & Demo Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Student Intake & Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {profile ? 'Edit Student Profile' : 'Setup Your Career Profile'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Provide your coursework, skills, and goals so our multi-agent system can calculate transparent fit scores.
          </p>
        </div>

        {/* Clearly labeled Demo prefill option */}
        <button
          onClick={loadDemoProfile}
          disabled={isLoading}
          type="button"
          className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all flex items-center gap-2 shrink-0"
        >
          <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Load Sample Student (Alex Rivera)</span>
        </button>
      </div>

      {/* 3-Step Wizard Navigation Indicator */}
      <div className="glass-panel p-4 rounded-2xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 flex items-center justify-between">
        {[
          { num: 1, label: '1. Academic Background' },
          { num: 2, label: '2. Technical Skills' },
          { num: 3, label: '3. Career Aspirations' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              step === s.num
                ? 'bg-emerald-600 text-white shadow-sm'
                : step > s.num
                ? 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s.num
                  ? 'bg-white/20 text-white'
                  : step > s.num
                  ? 'bg-emerald-500/20 text-emerald-600'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {s.num}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 flex items-center gap-3 text-sm text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Glass Form Card */}
      <div className="glass-panel p-7 sm:p-9 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          {/* STEP 1: Academic Background */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/70 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Step 1: Academic Background & Information
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tell us who you are and where you are in your academic journey.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Full Name <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Patel"
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Your real student name</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@university.edu"
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Used to associate your saved profile</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Degree Level
                  </label>
                  <select
                    value={formData.education_level}
                    onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none"
                  >
                    <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                    <option value="Graduate">Graduate (Master's)</option>
                    <option value="Associate Degree">Associate Degree / Diploma</option>
                    <option value="Self-Taught / Bootcamp">Self-Taught / Bootcamp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Field of Study / Major <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.field_of_study}
                    onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">e.g. Software Eng, Data, IT, Math</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    min={2024}
                    max={2032}
                    value={formData.graduation_year}
                    onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) || 2027 })}
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Available Study Hours Per Week: <span className="text-emerald-600 font-bold">{formData.weekly_hours_available} hrs</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={formData.weekly_hours_available}
                  onChange={(e) => setFormData({ ...formData, weekly_hours_available: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5 hrs (Light pacing)</span>
                  <span>15 hrs (Recommended)</span>
                  <span>40 hrs (Full-time boot)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Technical Skills */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/70 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Step 2: Technical Skills & Competencies
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Select the programming languages, tools, and frameworks you have practiced.
                </p>
              </div>

              {/* Selected skills tag bar */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Your Selected Skills ({formData.current_skills.length})
                </label>
                {formData.current_skills.length === 0 ? (
                  <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    No skills selected yet. Click any skill chip below or type custom tools to add them.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700">
                    {formData.current_skills.map((sk) => (
                      <span
                        key={sk}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-xs"
                      >
                        <span>{sk}</span>
                        <button
                          type="button"
                          onClick={() => toggleSkill(sk)}
                          className="hover:bg-emerald-700 p-0.5 rounded-full"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Common Skills Suggestions */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Common University Tech Skills (Click to Toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SKILLS.map((sk) => {
                    const isSelected = formData.current_skills.includes(sk);
                    return (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => toggleSkill(sk)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                            : 'bg-white/70 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add custom skill input */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Add Custom Skill or Tool
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomSkill();
                      }
                    }}
                    placeholder="e.g. FastAPI, Next.js, Kubernetes"
                    className="flex-1 h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCustomSkill}
                    className="px-5 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  General Technical Experience Level
                </label>
                <select
                  value={formData.experience_level}
                  onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none"
                >
                  <option value="beginner">Beginner (1st or 2nd year coursework)</option>
                  <option value="intermediate">Intermediate (Built side projects or coursework labs)</option>
                  <option value="advanced">Advanced (Completed prior internships or production apps)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Career Aspirations */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/70 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Step 3: Target Roles, Interests & Preferences
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Select which tech paths interest you to weight your recommendations appropriately.
                </p>
              </div>

              {/* Target Roles */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Target Tech Roles of Interest ({formData.target_roles.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TARGET_ROLE_OPTIONS.map((role) => {
                    const isSelected = formData.target_roles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => toggleRole(role)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                            : 'bg-white/70 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? `✓ ${role}` : `+ ${role}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Industry Interests */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Industry & Technology Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          isSelected
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-300'
                            : 'bg-white/70 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? `✓ ${interest}` : `+ ${interest}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Work style & bio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Preferred Work Setting
                  </label>
                  <select
                    value={formData.preferred_work_style}
                    onChange={(e) => setFormData({ ...formData, preferred_work_style: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none"
                  >
                    <option value="hybrid">Hybrid (Office + Remote)</option>
                    <option value="remote">Remote Only</option>
                    <option value="onsite">On-site / In-Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Short Aspirations / Bio <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="e.g. Looking for Summer 2026 internships in AI"
                    className="w-full h-12 px-4 rounded-xl glass-input text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-4">
            <div>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 hover:scale-[1.02] disabled:opacity-60"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Save Profile & Run AI Analysis</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
