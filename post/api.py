# post/api.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, List
from post.run import process_post_request

router = APIRouter(prefix="/agents/post", tags=["Post Agent"])

class PostChatRequest(BaseModel):
    message: str
    session_id: Optional[str]

# Conversation memory (in production: Redis/DB)
conversations: Dict[str, List[Dict]] = {}

@router.post("/chat")
async def chat_with_post_agent(payload: PostChatRequest):
    session = payload.session_id or "default"

    # Create session history if not exists
    if session not in conversations:
        conversations[session] = []

    # Add user message
    conversations[session].append({
        "role": "user",
        "content": payload.message
    })

    # Send ONLY latest message + full structured history to run.py
    ai_response = await process_post_request(
        message=payload.message,
        history=conversations[session]
    )

    # Add AI response to history
    conversations[session].append({
        "role": "assistant",
        "content": ai_response
    })

    return {
        "session_id": session,
        "response": ai_response,
        "conversation": conversations[session]
    }
