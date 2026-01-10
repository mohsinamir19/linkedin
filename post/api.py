from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import json

# Absolute imports to ensure it works within the project structure
from post.run import process_post_request

router = APIRouter(prefix="/agents/post", tags=["Post Agent"])

# ------------------------
# Request Model
# ------------------------
class PostChatRequest(BaseModel):
    message: str               # The user's prompt/message
    session_id: Optional[str] = "default"

# ------------------------
# Session Memory
# ------------------------
# Stores conversation logs to maintain context for the Orchestrator
conversations = {}

@router.post("/chat")
async def chat_with_post_agent(payload: PostChatRequest):
    session = payload.session_id

    # Initialize session history
    if session not in conversations:
        conversations[session] = []

    # 1. Append User Input to History
    conversations[session].append(f"User: {payload.message}")
    
    # 2. Compile full conversation string for the Orchestrator
    full_context = "\n".join(conversations[session])

    try:
        # 3. Call the run logic
        result = await process_post_request(full_context)

        # 4. Handle Response logic
        if result["status"] == "success":
            # If successful, the AI completed the task. 
            # We clear or mark the conversation as finished.
            ai_reply = f"Post successfully handled in mode: {result['mode']}"
            conversations[session].append(f"AI: {ai_reply}")
        else:
            # If incomplete, the AI is asking for missing info (like time or file path)
            ai_reply = result["reply"]
            conversations[session].append(f"AI: {ai_reply}")

        return {
            "session_id": session,
            "status": result["status"],
            "response": result,
            "history": conversations[session]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Post Agent Error: {str(e)}")