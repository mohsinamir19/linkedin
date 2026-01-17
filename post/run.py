# post/run.py
from agents import Runner
from post.agents_1.orchestrator import orchestrator_agent
from post.schemas import LinkedInPostRequest
from post.scheduler.scheduler import save_job, schedule_post

async def process_post_request(user_message: str, session, background_tasks):
    print(f"\n--- Processing: {user_message[:50]}... ---")

    result = await Runner.run(
        orchestrator_agent,
        user_message,
        session=session
    )

    if isinstance(result.final_output, LinkedInPostRequest):
        data = result.final_output

        response = {
            "status": "success",
            "mode": data.mode,
            "caption": data.caption,
            "file_path": data.file_path,
            "run_at": data.scheduled_time
        }

        if data.mode == "schedule":
            save_job(response)  # ✅ instant
            background_tasks.add_task(schedule_post, response)  # ✅ non-blocking

        return response

    return {
        "status": "incomplete",
        "reply": result.final_output
    }
