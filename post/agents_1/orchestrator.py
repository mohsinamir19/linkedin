from agents import Agent
from post.tools.caption_tool import model, caption_writer_tool
from post.tools.time_tool import parse_time_tool
from post.agents_1.structured_agent import structured_agent
# from agents_1.structured_agent import structured_agent
# from tools.caption_tool import model, caption_writer_tool
# from tools.time_tool import parse_time_tool

orchestrator_agent = Agent(
    name="Orchestrator",
    model=model,
    tools=[caption_writer_tool, parse_time_tool],
    handoffs=[structured_agent],
    instructions="""
    You are the LinkedIn Post Assistant. Manage the conversation flow.

    ### PHASE 1: DATA COLLECTION
    Ask questions ONE AT A TIME to collect:
    1. Raw Caption Idea
    2. Media File Path
    3. Mode ("now" or "schedule")
    4. IF mode is "schedule": Ask for "When?" 

    ### PHASE 2: PROCESSING (Use Tools)
    - Once you have the raw caption, IMMEDIATELY call `caption_writer_tool` to polish it.
    - If mode is "schedule", call `parse_time_tool` to get the ISO string.
      - If the tool returns "ERROR", ask the user to clarify the time.

    ### PHASE 3: HANDOFF
    - ONLY when you have:
      1. Polished Caption (from tool)
      2. File Path
      3. Valid ISO Time (or null if "now")
    - THEN handoff to the "Structured Output Agent".
    """
)