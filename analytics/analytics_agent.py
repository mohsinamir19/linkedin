import os
import json
from openai import AsyncOpenAI
from dotenv import load_dotenv
from agents import Agent, OpenAIChatCompletionsModel, function_tool

load_dotenv(override=True)

# --- Tool Definition ---
@function_tool
async def fetch_linkedin_analytics(query: str) -> str:
    """
    Retrieves stored LinkedIn post performance data including likes, comments, and post times.
    Use this tool whenever the user asks about their own post performance or 'best time to post'.
    """
    file_path = r"D:\linkedin\analytics\analytics.json"
    if not os.path.exists(file_path):
        return "Error: No analytics data found. Please run the scraper first."
    
    with open(file_path, "r") as f:
        data = json.load(f)
        return json.dumps(data)

# --- Agent Configuration ---
openai_api_key = os.getenv("DEEPSEEKr1_API_KEY")
base_url = "https://openrouter.ai/api/v1"

openai_client = AsyncOpenAI(base_url=base_url, api_key=openai_api_key)
# Using the requested Mistral model
openai_model = OpenAIChatCompletionsModel(
    model="mistralai/ministral-3b-2512",
    openai_client=openai_client
)

ANALYTICS_PROMPT = """
You are the LinkedIn Analytics Agent.

WORKFLOW:
1. Call 'fetch_linkedin_analytics' to get the raw data.
2. Calculate engagement using: Engagement = likes + (comments * 2).
3. Analyze which 'posted_time' and 'content_type' yield the highest engagement.
4. Return ONLY a valid JSON object.

OUTPUT FORMAT:
{
  "insight": "General trend observation",
  "evidence": "Specific data points justifying the insight",
  "recommendation": "Actionable advice for the user"
}
"""

analytics_agent = Agent(
    name="AnalyticsAgent",
    instructions=ANALYTICS_PROMPT,
    model=openai_model,
    tools=[fetch_linkedin_analytics]
)