from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter(prefix="/scheduler", tags=["Scheduler"])

JOBS_FILE = Path("post/scheduler/scheduled_jobs.json")


@router.get("/jobs")
async def get_scheduled_jobs():
    if not JOBS_FILE.exists():
        return {
            "count": 0,
            "jobs": []
        }

    with open(JOBS_FILE, "r", encoding="utf-8") as f:
        jobs = json.load(f)

    return {
        "count": len(jobs),
        "jobs": jobs
    }
