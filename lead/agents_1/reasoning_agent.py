# agents/reasoning_agent.py
from agents import Agent,OpenAIChatCompletionsModel
from schemas import ScoredLead
import os 
from openai import AsyncOpenAI
from dotenv import load_dotenv



load_dotenv(override=True)

openai_api_key=os.getenv("DEEPSEEKr1_API_KEY")

if openai_api_key:
    print(f"Google API key exists and begins {openai_api_key[:8]}")
else:
    print("OpenAI api key is not set")



base_url="https://openrouter.ai/api/v1"

openai=AsyncOpenAI(base_url=base_url, api_key=openai_api_key)

openai_model=OpenAIChatCompletionsModel(model="mistralai/ministral-3b-2512",openai_client=openai)


REASONING_PROMPT = """
You are a Lead Scoring and Qualification Engine.

INPUT:
- Raw LinkedIn profiles
- User filters
- Result limit

TASK:
1. Evaluate relevance
2. Assign score 0–100
3. Discard weak leads
4. Rank by score
5. Output JSON only
"""

reasoning_agent = Agent(
    name="ReasoningAgent",
    instructions=REASONING_PROMPT,
    model=openai_model,
    output_type=list[ScoredLead],
)

reasoning_agent_tool = reasoning_agent.as_tool(
    tool_name="score_and_rank_leads",
    tool_description="Score, filter, and rank LinkedIn leads"
)
