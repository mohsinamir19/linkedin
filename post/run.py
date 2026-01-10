from agents import Runner
import asyncio
# from post.agents_1.orchestrator import orchestrator_agent
from agents_1.orchestrator import orchestrator_agent
# from post.schemas import LinkedInPostRequest
from schemas import LinkedInPostRequest
# Import your existing scheduler/tools if needed for dispatch
# from post.scheduler.scheduler import save_job, schedule_post 
from scheduler.scheduler import save_job, schedule_post 

async def process_post_request(user_conversation: str):
    print(f"\n--- Processing: {user_conversation[:50]}... ---")
    
    result = await Runner.run(orchestrator_agent, user_conversation)
    
    # Check if final output is our Pydantic Schema
    if isinstance(result.final_output, LinkedInPostRequest):
        data = result.final_output
        print("\n✅ Valid Structured Output Received")
        
        # --- DISPATCH LOGIC START ---
        # This replaces your old handle_post_request
        response = {
            "status": "success",
            "mode": data.mode,
            "caption": data.caption,
            "file_path": data.file_path,
            "run_at": data.scheduled_time
        }
        
        if data.mode == "schedule":
            # Call your existing scheduler logic here
            save_job(response)
            await schedule_post(response)
            
        return response
        # --- DISPATCH LOGIC END ---

    else:
        # Conversation incomplete, return agent's question
        return {
            "status": "incomplete",
            "reply": result.final_output
        }
        
if __name__ == "__main__":
    # This test case provides ALL info at once to see the chain-reaction:
    # 1. Orchestrator receives input
    # 2. Orchestrator calls Caption Tool (polishing)
    # 3. Orchestrator calls Time Tool (parsing 'tomorrow at 3pm')
    # 4. Orchestrator hands off to Structured Agent
    # 5. Pydantic validation triggers
    
    test_input = (
        "I want to create a post about the future of AI Agents in 2026. "
        "Use the image at C:\\Users\\user\\Downloads\\download.jpeg. "
        "Please schedule this for today 5:15 pm . I am located in the pakistan."
    )

    print("\n🚀 STARTING FULL SYSTEM INTEGRATION TEST...")
    asyncio.run(process_post_request(test_input))