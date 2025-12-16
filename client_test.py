# test_linkedin_client.py
import asyncio
from client import list_linkedin_tools, call_linkedin_tool

async def main():
    # List all tools
    tools = await list_linkedin_tools()
    print("Available LinkedIn tools:")
    for tool in tools:
        print("-", tool.name, ":", tool.description)

    # Example: Call the linkedin_post tool (adjust args)
    tool_args = {
        "email": "your_email@gmail.com",
        "password": "your_password",
        "caption_text": "Hello from MCP agent 🚀",
        "file_path": r"C:\path\to\image.png"
    }
    result = await call_linkedin_tool("linkedin_post", tool_args)
    print("Tool result:", result)

asyncio.run(main())
