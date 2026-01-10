# # # scheduler/scheduler.py
# # import asyncio
# # import json
# # from datetime import datetime, timezone
# # # from post.tools.linkedin_post_tool import linkedin_post_tool
# # from tools.linkedin_post_tool import linkedin_post_tool
# # import os
# # from datetime import datetime, timezone

# # SCHEDULE_FILE = r"D:\linkedin\post\scheduler\scheduled_jobs.json"

# # def save_job(job: dict):
# #     try:
# #         with open(SCHEDULE_FILE, "r") as f:
# #             jobs = json.load(f)
# #     except Exception:
# #         jobs = []

# #     jobs.append(job)

# #     with open(SCHEDULE_FILE, "w") as f:
# #         json.dump(jobs, f, indent=2)


# # async def schedule_post(job: dict):
# #     # Convert ISO string → timezone-aware datetime (UTC)
    

# #     run_at = datetime.fromisoformat(job["run_at"])  # Converts ISO string to datetime


# #     # Make now timezone-aware (UTC)
# #     now = datetime.now(timezone.utc)

# #     delay = (run_at - now).total_seconds()

# #     if delay <= 0:
# #         raise ValueError("Scheduled time must be in the future")

# #     print(f"⏳ Waiting {delay:.2f} seconds to post...")

# #     await asyncio.sleep(delay)

# #     # Execute the LinkedIn post
# #     await linkedin_post_tool(
# #         email=os.getenv("LINKEDIN_EMAIL"),
# #         password=os.getenv("LINKEDIN_PASSWORD"),
# #         caption_text=job["caption"],
# #         file_path=job["file_path"]
# #     )

# #     print("✅ Scheduled LinkedIn post executed successfully")





import asyncio
import json
import os
from datetime import datetime, timezone
from tools.linkedin_post_tool import linkedin_post_tool

SCHEDULE_FILE = r"D:\linkedin\post\scheduler\scheduled_jobs.json"

def save_job(job: dict):
    try:
        if os.path.exists(SCHEDULE_FILE):
            with open(SCHEDULE_FILE, "r") as f:
                jobs = json.load(f)
        else:
            jobs = []
    except Exception:
        jobs = []

    jobs.append(job)

    with open(SCHEDULE_FILE, "w") as f:
        json.dump(jobs, f, indent=2)


async def schedule_post(job: dict):
    """
    Calculates the delay accurately by force-syncing both 
    target time and current time to UTC.
    """
    # 1. Convert the saved ISO string to a Python object
    # fromisoformat handles +05:00 or +00:00 automatically
    run_at_obj = datetime.fromisoformat(job["run_at"])

    # 2. THE CRITICAL FIX: Force both to UTC for the math
    # This prevents the "Hour Plus" jump.
    target_time_utc = run_at_obj.astimezone(timezone.utc)
    now_utc = datetime.now(timezone.utc)

    # 3. Calculate delay in seconds
    delay = (target_time_utc - now_utc).total_seconds()

    # 4. THE GRACE PERIOD FIX:
    # If delay is between 0 and -10 seconds, it's just processing lag.
    # We set delay to 0 and post immediately instead of crashing.
    if -10 < delay <= 0:
        print("🕒 Target time reached during processing. Posting now...")
        delay = 0 
    elif delay <= -10:
        # Only crash if the time is actually long gone (over 10 seconds ago)
        raise ValueError(f"Scheduled time ({job['run_at']}) is in the past.")

    print(f"⏳ Final Delay: {delay:.2f} seconds.")

    if delay > 0:
        await asyncio.sleep(delay)

    # Execute the LinkedIn post
    await linkedin_post_tool(
        # email=os.getenv("LINKEDIN_EMAIL"),
        # password=os.getenv("LINKEDIN_PASSWORD"),
        caption_text=job["caption"],
        file_path=job["file_path"]
    )

    print("✅ Scheduled LinkedIn post executed successfully")



