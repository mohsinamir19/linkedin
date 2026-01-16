# run.py
from agents import Runner
from post.agents_1.orchestrator import orchestrator_agent
from post.schemas import LinkedInPostRequest
from post.scheduler.scheduler import save_job, schedule_post
#

async def process_post_request(message: str, history=None):
    print(f"\n--- Processing: {message[:50]}... ---")

    result = await Runner.run(
        orchestrator_agent,
        message,
        history=history  # <--- pass full conversation
    )

    # Structured output received
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

    # Not finished — agent is asking for more info
    return {
        "status": "incomplete",
        "reply": result.final_output
    }
