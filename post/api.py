# post/api.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, List
from post.run import process_post_request

router = APIRouter(prefix="/agents/post", tags=["Post Agent"])

class PostChatRequest(BaseModel):
    message: str
    session_id: Optional[str]

# Conversation store (session memory)
conversations: Dict[str, List[Dict]] = {}

@router.post("/chat")
async def chat_with_post_agent(payload: PostChatRequest):
    session = payload.session_id or "default"

    # Initialize session
    if session not in conversations:
        conversations[session] = []

    # Add user message
    conversations[session].append({
        "role": "user",
        "content": payload.message
    })

    # --- BUILD multi-turn conversation string for orchestrator ---
    convo_text = ""
    for msg in conversations[session]:
        role = "User" if msg["role"] == "user" else "AI"
        convo_text += f"{role}: {msg['content']}\n"

    # SEND FULL CONVERSATION to Runner
    ai_response = await process_post_request(convo_text.strip())

    # Add AI response to memory
    conversations[session].append({
        "role": "assistant",
        "content": ai_response
    })

    return {
        "session_id": session,
        "response": ai_response,
        "conversation": conversations[session]
    }
