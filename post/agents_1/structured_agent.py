from agents import Agent
# from post.tools.caption_tool import model # Re-using the model instance
# from post.schemas import LinkedInPostRequest
from tools.caption_tool import model # Re-using the model instance
from schemas import LinkedInPostRequest

structured_agent = Agent(
    name="Structured Output Agent",
    model=model,
    output_type=LinkedInPostRequest,
    instructions="""
    You are a data formatting engine.
    You receive final validated state: caption, file_path, mode, and time.
    Your ONLY job is to output the Pydantic object.
    
    RULES:
    1. If mode is "now", ensure scheduled_time is null.
    2. If mode is "schedule", ensure scheduled_time is the ISO string provided.
    """
)