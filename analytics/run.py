import json
from agents import Runner
# Assuming your agent file is named analytics_agent.py inside the analytics folder
from analytics.analytics_agent import analytics_agent

async def process_analytics_request(query: str):
    """
    Wraps the query in the JSON structure expected by the Analytics Agent,
    runs the agent, and returns a structured dictionary.
    """
    
    # 1. Prepare the input exactly how the agent expects it
    input_payload = json.dumps({
        "question": query
    })

    # 2. Run the agent
    result = await Runner.run(analytics_agent, input_payload)
    output = result.final_output.strip()

    # 3. Parse the result
    try:
        # The agent is instructed to return ONLY JSON
        insights = json.loads(output)
        
        return {
            "status": "completed",
            "decision": insights
        }

    except json.JSONDecodeError:
        # Fallback if the model outputs text instead of JSON
        return {
            "status": "incomplete",
            "reply": output
        }