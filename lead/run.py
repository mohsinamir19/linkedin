import json
import os
import sys

# Ensure project root is in path for imports to work
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents import Runner
from lead.agents_1.main_agent import structured_leads_agent 

async def process_lead_request(query_data: dict):
    # This calls the Agent
    # If using pydantic-ai or similar:
    result = await structured_leads_agent.run(str(query_data))
    
    # ❌ OLD BUGGY WAY: 
    # return {"status": "completed", "reply": result.data.strip()} <-- CRASH!

    # ✅ NEW FIXED WAY:
    # Check if the data is already the LeadsList object
    if hasattr(result.data, 'leads'):
        # Convert Pydantic/Dataclass to a list of dicts for the API
        leads_as_dicts = [lead.model_dump() if hasattr(lead, 'model_dump') else lead.__dict__ 
                         for lead in result.data.leads]
        return {
            "status": "completed",
            "leads": leads_as_dicts
        }
    
    # Fallback if it returned a string instead of the object
    return {
        "status": "completed",
        "reply": str(result.data).strip()
    }

# For manual CLI testing
if __name__ == "__main__":
    import asyncio
    test_payload = {
        "filters": {"job_title": "Software Engineer", "location": "Berlin"},
        "limit": 3
    }
    print(asyncio.run(process_lead_request(test_payload)))