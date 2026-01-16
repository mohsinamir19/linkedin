# post/api.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
# Ensure this EXACT line is used:
from post.run import process_post_request

router = APIRouter(prefix="/agents/post", tags=["Post Agent"])

# ------------------------
# Request model
# ------------------------
class PostChatRequest(BaseModel):
    message: str               # new user message
    session_id: Optional[str]  # optional session identifier

# ------------------------
# Simple in-memory conversation store
# ------------------------
# This stores all messages per session_id
# In production, replace with DB or Redis
conversations = {}

# ------------------------
# Chat endpoint
# ------------------------
@router.post("/chat")
async def chat_with_post_agent(payload: PostChatRequest):
    session = payload.session_id or "default"

    # Initialize session history if not exists
    if session not in conversations:
        conversations[session] = []

    # Append user message to history
    conversations[session].append(f"User: {payload.message}")

    # Combine full conversation to send to AI
    full_conversation = "\n".join(conversations[session])

    # Get AI response
    ai_response = await process_post_request(full_conversation)

    # Append AI response to history
    conversations[session].append(f"AI: {ai_response}")

    return {
        "session_id": session,
        "response": ai_response,
        "conversation": conversations[session]  # optional full conversation
    }
