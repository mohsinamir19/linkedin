# post/api.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from agents import SQLiteSession
from post.run import process_post_request

router = APIRouter(prefix="/agents/post", tags=["Post Agent"])

class PostChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"

# 🔥 SQLite-backed session store
sessions: dict[str, SQLiteSession] = {}

def get_session(session_id: str) -> SQLiteSession:
    if session_id not in sessions:
        sessions[session_id] = SQLiteSession(session_id)
    return sessions[session_id]

@router.post("/chat")
async def chat_with_post_agent(payload: PostChatRequest):
    session = get_session(payload.session_id)

    ai_response = await process_post_request(
        payload.message,
        session
    )

    return {
        "session_id": payload.session_id,
        "response": ai_response
    }
