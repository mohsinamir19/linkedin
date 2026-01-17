# lead/agents/main_agent_structured.py
from agents import Agent, OpenAIChatCompletionsModel
from lead.schemas import LeadsList
from lead.tools.linkedin_search_tool import linkedin_search_tool
from lead.agents_1.reasoning_agent import reasoning_agent_tool
from openai import AsyncOpenAI
import os
from dotenv import load_dotenv

load_dotenv(override=True)

openai_api_key = os.getenv("DEEPSEEKr1_API_KEY")

if openai_api_key:
    print(f"OpenAI API key exists: {openai_api_key[:8]}")
else:
    print("OpenAI API key is not set")

base_url = "https://openrouter.ai/api/v1"
openai = AsyncOpenAI(base_url=base_url, api_key=openai_api_key)

openai_model = OpenAIChatCompletionsModel(
    model="mistralai/ministral-3b-2512", 
    openai_client=openai
)

STRUCTURED_PROMPT = """
You are a Lead Discovery Agent.

INPUT:
- Validated JSON with: job_title, location, industry, keywords, limit

TASK:
1. Call LinkedIn Search Tool and Reasoning Agent internally.
2. Collect top leads.
3. Output ONLY JSON that matches the LeadsList dataclass.
4. Each lead MUST include:
   - name
   - linkedin_url
   - role
   - company
   - location
   - connectionDegree
   - relevance_score
   - explanation
5. Always return the JSON under the key 'leads'.
6. Do not add any extra text, comments, or formatting.
7. Ensure linkedin_url is a valid URL.
8. Ensure relevance_score is an integer.
"""

structured_leads_agent = Agent(
    name="StructuredLeadsAgent",
    instructions=STRUCTURED_PROMPT,
    model=openai_model,
    tools=[linkedin_search_tool, reasoning_agent_tool],
    output_type=LeadsList,
)
