from agents import Runner
import asyncio
import logging
from datetime import datetime

# from post.agents_1.orchestrator import orchestrator_agent
from agents_1.orchestrator import orchestrator_agent
# from post.schemas import LinkedInPostRequest
from schemas import LinkedInPostRequest
# from post.scheduler.scheduler import save_job, schedule_post 
from scheduler.scheduler import save_job, schedule_post 


# ------------------------
# LOGGING SETUP
# ------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)
logger = logging.getLogger(__name__)


async def process_post_request(user_conversation: str):
    logger.info("➡️ process_post_request started")
    logger.info(f"🧾 Raw user input: {user_conversation}")

    try:
        logger.info("🤖 Calling Runner.run()")
        result = await Runner.run(orchestrator_agent, user_conversation)
        logger.info("✅ Runner.run() completed")

    except Exception as e:
        logger.exception("❌ Runner.run() FAILED")
        return {
            "status": "error",
            "error": str(e)
        }

    # ------------------------
    # RESULT INSPECTION
    # ------------------------
    logger.info(f"🔍 result type: {type(result)}")

    final_output = getattr(result, "final_output", None)
    logger.info(f"🔍 final_output type: {type(final_output)}")
    logger.info(f"🔍 final_output value: {final_output}")

    # ------------------------
    # STRUCTURED OUTPUT CHECK
    # ------------------------
    if isinstance(final_output, LinkedInPostRequest):
        logger.info("✅ final_output is LinkedInPostRequest (Pydantic validated)")

        data = final_output

        response = {
            "status": "success",
            "mode": data.mode,
            "caption": data.caption,
            "file_path": data.file_path,
            "run_at": data.scheduled_time
        }

        logger.info(f"📦 Response payload prepared: {response}")

        if data.mode == "schedule":
            try:
                logger.info("⏰ Scheduling mode detected")
                save_job(response)
                logger.info("💾 Job saved successfully")

                logger.info("🚀 Calling schedule_post()")
                await schedule_post(response)
                logger.info("✅ schedule_post() completed")

            except Exception as e:
                logger.exception("❌ Scheduling failed")
                return {
                    "status": "error",
                    "error": str(e)
                }

        return response

    else:
        logger.warning("⚠️ final_output is NOT LinkedInPostRequest")
        logger.warning("🔁 Agent is requesting more input")

        return {
            "status": "incomplete",
            "reply": final_output
        }


# ------------------------
# CLI TEST ENTRY POINT
# ------------------------
if __name__ == "__main__":
    test_input = (
        "I want to create a post about the future of AI Agents in 2026. AI agents will transform industries of medical billing, I carete the agents. whihc handles the billing process of medical filed and the doctor  "
        "Use the image at C:\\Users\\user\\Downloads\\download.jpeg. "
        "Please schedule this for today 7:39pm Pakistan timezone"
    )

    logger.info("🚀 STARTING FULL SYSTEM INTEGRATION TEST")
    asyncio.run(process_post_request(test_input))
