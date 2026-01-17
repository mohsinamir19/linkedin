import json
import os
import sys

# Ensure project root is in path for imports to work
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents import Runner
from lead.agents_1.main_agent import structured_leads_agent 

async def process_lead_request(query_data: dict):
    print("\n🔍 Processing Lead Request...")

    # ✅ CORRECT: use Runner.run (Agent has no .run)
    result = await Runner.run(
        structured_leads_agent,
        str(query_data)
    )

    # If structured output is a leads list
    if hasattr(result.final_output, "leads"):
        leads = result.final_output.leads

        leads_as_dicts = [
            lead.model_dump() if hasattr(lead, "model_dump") else lead.__dict__
            for lead in leads
        ]

        return {
            "status": "completed",
            "leads": leads_as_dicts
        }

    # Fallback (agent returned natural text)
    return {
        "status": "completed",
        "reply": str(result.final_output).strip()
    }

# For manual CLI testing
if __name__ == "__main__":
    import asyncio
    test_payload = {
        "filters": {"job_title": "Software Engineer", "location": "Berlin"},
        "limit": 3
    }
    print(asyncio.run(process_lead_request(test_payload)))
