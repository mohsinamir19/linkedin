from agents import Runner
import asyncio
from post.agents_1.orchestrator import orchestrator_agent
from post.schemas import LinkedInPostRequest
from post.scheduler.scheduler import save_job, schedule_post 
# from agents_1.orchestrator import orchestrator_agent
# from schemas import LinkedInPostRequest
# from scheduler.scheduler import save_job, schedule_post 


async def process_post_request(user_message: str, session):
    print(f"\n--- Processing: {user_message[:50]}... ---")
    
    result = await Runner.run(orchestrator_agent, user_message, session=session )
    
    if isinstance(result.final_output, LinkedInPostRequest):
        data = result.final_output
        print("\n✅ Valid Structured Output Received", data)
        
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

if __name__ == "__main__":
    test_input = (
        "I want to create a post about the future of AI Agents in 2026. "
        "Use the image at C:\\Users\\sbato\\OneDrive\\Desktop\\linkedin\\linkedin\\extras\\linkedin_debug.png "
        "Please schedule this for today 10:48 am. I am located in Pakistan."
    )

    print("\n🚀 STARTING FULL SYSTEM INTEGRATION TEST...")
    asyncio.run(process_post_request(test_input))
