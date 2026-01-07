import asyncio
import json
from agents import Runner
from analytics_agent import analytics_agent

# Tailored input for the Analytics Agent
input_str = json.dumps({
    "question": "When is the best time for me to post to get the most comments and likes?",
})

async def run():
    print("--- Starting Analytics Agent ---")
    
    # Using the SDK Runner to execute the agent logic
    result = await Runner.run(
        analytics_agent,
        input_str
    )

    # Output the structured JSON response
    print("\nFINAL INSIGHTS:")
    print(result.final_output)

if __name__ == "__main__":
    # Ensure you have an analytics.json file in the root before running
    asyncio.run(run())