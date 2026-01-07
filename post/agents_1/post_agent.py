# agents/post_agent.py
from agents import Agent,OpenAIChatCompletionsModel
from post.scheduler.scheduler import save_job, schedule_post
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from openai import AsyncOpenAI
import os



load_dotenv(override=True)

openai_api_key=os.getenv("DEEPSEEKr1_API_KEY")

if openai_api_key:
    print(f"Google API key exists and begins {openai_api_key[:8]}")
else:
    print("OpenAI api key is not set")



base_url="https://openrouter.ai/api/v1"

openai=AsyncOpenAI(base_url=base_url, api_key=openai_api_key)

openai_model=OpenAIChatCompletionsModel(model="mistralai/ministral-3b-2512",openai_client=openai)







post_agent = Agent(
    name="LinkedIn Post Agent",
    model=openai_model,
    instructions="""
You help users publish LinkedIn posts interactively.

Ask questions ONE AT A TIME to collect:
1. caption
2. media file path
3. mode (now or schedule)
4. scheduled date/time (ISO format) IF mode is schedule

RULES (VERY IMPORTANT):
- Do NOT output JSON until ALL fields are collected
- Once all fields are collected, output ONLY valid JSON
- Do NOT include explanations, markdown, comments, or text
- Output MUST start with { and end with }
- scheduled_time must be null if mode is "now"

Final output format (ONLY THIS):
{
  "caption": "...",
  "file_path": "...",
  "mode": "now" or "schedule",
  "scheduled_time": "ISO_TIME" or null
}
"""

)

async def handle_post_request(
    caption: str,
    file_path: str,
    mode: str,
    scheduled_time: str | None = None
):
    print("MODE:", mode)
    print("SCHEDULED_TIME:", scheduled_time)

    if mode == "now":
        from tools.linkedin_post_tool import linkedin_post_tool
        return await linkedin_post_tool(
            email="ENV",
            password="ENV",
            caption_text=caption,
            file_path=file_path
        )

    if mode == "schedule":
        job = {
            "caption": caption,
            "file_path": file_path,
            "run_at": scheduled_time
        }

        save_job(job)
        await schedule_post(job)

        return {
            "status": "scheduled",
            "message": f"Post scheduled for {scheduled_time}"
        }
