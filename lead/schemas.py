# schemas.py
from dataclasses import dataclass
from typing import List


# ===============================
# Search Input Schemas
# ===============================

@dataclass
class SearchFilters:
    job_title: str
    location: str
    keywords: List[str]
    industry: str | None = None


@dataclass
class SearchRequest:
    filters: SearchFilters
    limit: int


# ===============================
# Raw LinkedIn Data (NO reasoning)
# ===============================

@dataclass
class RawLinkedInProfile:
    name: str
    title: str
    company: str
    headline: str
    summary: str
    skills: List[str]
    location: str
    linkedin_url: str
    last_active_days: int
    mutual_connections: int
    industry: str
    company_size: str


# ===============================
# Scored & Qualified Lead
# ===============================

@dataclass
class ScoredLead:
    name: str
    linkedin_url: str
    relevance_score: int
    explanation: str
