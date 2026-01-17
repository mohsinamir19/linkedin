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
        query_data = {
            "filters": payload.filters.model_dump(exclude_none=True),
            "limit": payload.limit
        }
        
        result = await process_lead_request(query_data)
        
        # If the agent returned a 'reply' (string) instead of 'leads' (list)
        # we wrap it so the frontend doesn't crash
        data_to_return = result.get("leads", [])
        
        if not data_to_return and "reply" in result:
            print(f"🤖 Agent Message: {result['reply']}")
            # Optional: You could parse the reply string back into a list here if needed

        return {
            "session_id": payload.session_id,
            "status": result.get("status", "completed"),
            "data": data_to_return
        }
    except Exception as e:
        import traceback
        traceback.print_exc() # This will show you exactly which line crashed in your terminal
        raise HTTPException(status_code=500, detail=str(e))