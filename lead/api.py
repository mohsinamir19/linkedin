from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from lead.run import process_lead_request

router = APIRouter(prefix="/agents/lead", tags=["Lead Agent"])

# ------------------------
# Request Models
# ------------------------
class LeadFilters(BaseModel):
    job_title: Optional[str] = None
    location: Optional[str] = None
    industry: Optional[str] = None
    keywords: Optional[list] = []

class LeadSearchRequest(BaseModel):
    filters: LeadFilters
    limit: Optional[int] = 5
    session_id: Optional[str] = "default"

# ------------------------
# Endpoints
# ------------------------
@router.post("/search")
async def search_leads(payload: LeadSearchRequest):
    try:
        # Convert Pydantic model to dict for the runner
        query_data = {
            "filters": payload.filters.model_dump(exclude_none=True),
            "limit": payload.limit
        }
        
        result = await process_lead_request(query_data)
        
        return {
            "session_id": payload.session_id,
            "status": result["status"],
            "data": result.get("leads") if result["status"] == "completed" else result.get("reply")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))