import json
import os
import sys

# Ensure project root is in path for imports to work
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents import Runner
from lead.agents_1.main_agent import structured_leads_agent 

async def process_lead_request(query_data: dict):
    """
    query_data should be a dictionary containing 'filters' and 'limit'.
    Example: {"filters": {"job_title": "Engineer"}, "limit": 5}
    """
    
    # 1. Convert the dict to JSON string for the Agent
    input_str = json.dumps(query_data)

    # 2. Run the Orchestrator Agent
    result = await Runner.run(structured_leads_agent , input_str)
    output = result.final_output.strip()

    try:
        # The agent returns a JSON array of leads
        leads_data = json.loads(output)
        return {
            "status": "completed",
            "leads": leads_data
        }
    except json.JSONDecodeError:
        return {
            "status": "incomplete",
            "reply": output
        }

# For manual CLI testing
if __name__ == "__main__":
    import asyncio
    test_payload = {
        "filters": {"job_title": "Software Engineer", "location": "Berlin"},
        "limit": 3
    }
    print(asyncio.run(process_lead_request(test_payload)))