# run.py
from agents import Runner
from agents_1.orchestrator import orchestrator_agent
from schemas import LinkedInPostRequest
from scheduler.scheduler import save_job, schedule_post

async def process_post_request(message: str):
    print(f"\n--- Processing: {message[:50]}... ---")

    # Runner.run ACCEPTS ONLY (agent, message)
    result = await Runner.run(
        orchestrator_agent,
        message
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
            save_job(response)
            await schedule_post(response)

        return response

    return {
        "status": "incomplete",
        "reply": result.final_output
    }
