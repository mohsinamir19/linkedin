from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from analytics.run import process_analytics_request

router = APIRouter(prefix="/agents/analytics", tags=["Analytics Agent"])

class AnalyticsRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"

# In-memory store for session tracking
conversations = {}

@router.post("/chat")
async def chat_with_analytics(payload: AnalyticsRequest):
    session = payload.session_id
    
    if session not in conversations:
        conversations[session] = []

    # Add user message to history
    conversations[session].append(f"User: {payload.message}")

    # Process the request
    ai_result = await process_analytics_request(payload.message)

    # Store result in history
    if ai_result["status"] == "completed":
        conversations[session].append(f"AI: {ai_result['decision'].get('insight')}")
    else:
        conversations[session].append(f"AI: {ai_result['reply']}")

    return {
        "session_id": session,
        "response": ai_result,
        "history": conversations[session]
    }