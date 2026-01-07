# run.py
import asyncio
from agents import Runner
from schemas import SearchRequest, SearchFilters
from agents_1.main_agent import main_leads_agent
import json

input_str = json.dumps({
    "filters": {
        "job_title": "Software Engineer",
        "location": "Berlin",
        "industry": "Technology",
        "keywords": ["Python", "AWS", "AI"],
    },
    "limit": 5,
})

async def run():
    result = await Runner.run(
    main_leads_agent,
    input_str
)


    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(run())
