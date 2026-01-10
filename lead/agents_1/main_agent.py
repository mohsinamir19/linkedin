# agents/main_agent.py
from agents import Agent,OpenAIChatCompletionsModel
from lead.tools.linkedin_search_tool import linkedin_search_tool
from lead.agents_1.reasoning_agent import reasoning_agent_tool
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

MAIN_PROMPT = """
You are the Main Lead Discovery Orchestrator.

INPUT FORMAT:
- Input is a JSON string.
- You must parse it into an object before use.

WORKFLOW:
1. Parse the JSON input.
2. Call the LinkedIn Search Tool with parsed data.
3. Pass raw profiles to the Reasoning Agent.
4. Enforce result limits.
5. Return ONLY the final JSON array of leads.

"""

main_leads_agent = Agent(
    name="MainLeadsAgent",
    instructions=MAIN_PROMPT,
    model=openai_model,
    tools=[
        linkedin_search_tool,
        reasoning_agent_tool
    ]
)
