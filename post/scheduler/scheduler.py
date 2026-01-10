# scheduler/scheduler.py
import asyncio
import json
from datetime import datetime, timezone
# from post.tools.linkedin_post_tool import linkedin_post_tool
from tools.linkedin_post_tool import linkedin_post_tool
import os

SCHEDULE_FILE = r"D:\linkedin\post\scheduler\scheduled_jobs.json"

def save_job(job: dict):
    try:
        with open(SCHEDULE_FILE, "r") as f:
            jobs = json.load(f)
    except Exception:
        jobs = []

    jobs.append(job)

    with open(SCHEDULE_FILE, "w") as f:
        json.dump(jobs, f, indent=2)


async def schedule_post(job: dict):
    # Convert ISO string → timezone-aware datetime (UTC)
    run_at = datetime.fromisoformat(
        job["run_at"].replace("Z", "+00:00")
    )

    # Make now timezone-aware (UTC)
    now = datetime.now(timezone.utc)

    delay = (run_at - now).total_seconds()

    if delay <= 0:
        raise ValueError("Scheduled time must be in the future")

    print(f"⏳ Waiting {delay:.2f} seconds to post...")

    await asyncio.sleep(delay)

    # Execute the LinkedIn post
    await linkedin_post_tool(
        email=os.getenv("LINKEDIN_EMAIL"),
        password=os.getenv("LINKEDIN_PASSWORD"),
        caption_text=job["caption"],
        file_path=job["file_path"]
    )

    print("✅ Scheduled LinkedIn post executed successfully")
