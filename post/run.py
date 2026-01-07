# post/run.py
from agents import Runner
from post.agents_1.post_agent import post_agent, handle_post_request
import json

async def process_post_request(conversation: str):
    result = await Runner.run(post_agent, conversation)
    output = result.final_output.strip()

    try:
        decision = json.loads(output)
    except json.JSONDecodeError:
        return {
            "status": "incomplete",
            "reply": output
        }

    execution_result = await handle_post_request(
        caption=decision["caption"],
        file_path=decision.get("file_path"),
        mode=decision["mode"],
        scheduled_time=decision.get("scheduled_time")
    )

    return {
        "status": "completed",
        "decision": decision,
        "execution": execution_result
    }
