# scheduler/scheduler.py
import asyncio
import json
from datetime import datetime
from post.tools.linkedin_post_tool import linkedin_post_tool
# from tools.linkedin_post_tool import linkedin_post_tool
import os

SCHEDULE_FILE = r"D:\linkedin\post\scheduler\scheduled_jobs.json"


def save_job(job: dict):
    """Save a scheduled job to JSON file."""
    print("📁 SAVE_JOB: Attempting to save scheduled job")

    try:
        with open(SCHEDULE_FILE, "r") as f:
            jobs = json.load(f)
            print(f"📂 SAVE_JOB: Loaded existing jobs ({len(jobs)})")
    except Exception:
        print("⚠️ SAVE_JOB: No existing schedule file found or failed to load")
        jobs = []

    jobs.append(job)
    print("➕ SAVE_JOB: Job appended to list")

    with open(SCHEDULE_FILE, "w") as f:
        json.dump(jobs, f, indent=2)
        print("💾 SAVE_JOB: Job saved successfully to JSON file")


async def schedule_post(job: dict):
    """Schedule a LinkedIn post based on job['run_at'] in PK time."""
    print("🗓️ SCHEDULER: Starting schedule_post")
    print(f"📦 SCHEDULER: Job received → {job}")

    # Parse run_at ISO string → timezone-aware datetime
    run_at = datetime.fromisoformat(job["run_at"])
    print(f"⏰ SCHEDULER: Parsing run_at time → {run_at.isoformat()}")

    # Use now in same timezone as run_at
    now = datetime.now(run_at.tzinfo)
    print(f"🕒 SCHEDULER: Current time → {now.isoformat()}")

    # Calculate delay in seconds
    delay = (run_at - now).total_seconds()
    print(f"⏳ SCHEDULER: Calculated delay → {delay:.2f} seconds")

    if delay <= 0:
        print("❌ SCHEDULER ERROR: Scheduled time is in the past")
        raise ValueError("Scheduled time must be in the future")

    print(f"⏳ Waiting {delay:.2f} seconds to post...")
    await asyncio.sleep(delay)

    print("🚀 SCHEDULER: Time reached, executing LinkedIn post tool")

    # Execute the LinkedIn post
    await linkedin_post_tool(
        email=os.getenv("LINKEDIN_EMAIL"),
        password=os.getenv("LINKEDIN_PASSWORD"),
        caption_text=job["caption"],
        file_path=job["file_path"]
    )

    print("✅ SCHEDULER: Scheduled LinkedIn post executed successfully")
