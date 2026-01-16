# post/api.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from post.run import process_post_request

router = APIRouter(prefix="/agents/post", tags=["Post Agent"])

class PostChatRequest(BaseModel):
    message: str
    session_id: Optional[str]

# Optional conversation store (if you want to show history to user)
conversations = {}

@router.post("/chat")
async def chat_with_post_agent(payload: PostChatRequest):
    session = payload.session_id or "default"

    # Store history (optional)
    if session not in conversations:
        conversations[session] = []
    conversations[session].append({"role": "user", "content": payload.message})

    # Send ONLY the latest message to the orchestrator
    ai_response = await process_post_request(payload.message)

    # Save AI response to conversation (optional)
    conversations[session].append({"role": "assistant", "content": ai_response})

    return {
        "session_id": session,
        "response": ai_response,
        "conversation": conversations[session]  # optional
    }
