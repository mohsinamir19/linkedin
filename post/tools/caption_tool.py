import os
from openai import AsyncOpenAI
from agents import Agent, OpenAIChatCompletionsModel
from dotenv import load_dotenv

load_dotenv(override=True)

# Initialize shared model (ideally move this to a config file)
client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1", 
    api_key=os.getenv("DEEPSEEKr1_API_KEY")
)
model = OpenAIChatCompletionsModel(model="mistralai/ministral-3b-2512", openai_client=client)

# Define the worker agent
_caption_worker = Agent(
    name="CaptionWorker",
    model=model,
    instructions="""
    You are an expert LinkedIn copywriter.
    Input: A raw, messy idea from the user.
    Output: A single, professional, engaging LinkedIn caption.
    - Use appropriate emojis.
    - Fix grammar.
    - Keep it concise (under 200 words).
    - RETURN ONLY THE CAPTION TEXT. NO CONVERSATIONAL FILLER.
    """
)

# Export as a tool
caption_writer_tool = _caption_worker.as_tool(
    tool_name="caption_writer_tool",
    tool_description="Takes a raw idea and returns a polished LinkedIn caption."
)