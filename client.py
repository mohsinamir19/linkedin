# linkedin_client.py
import mcp
from mcp.client.stdio import stdio_client
from mcp import StdioServerParameters
from agents import FunctionTool
import json

# Point to your MCP server file
params = StdioServerParameters(command="uv", args=["run", "server.py"], env=None)

# --- List MCP tools available on the server ---
async def list_linkedin_tools():
    async with stdio_client(params) as streams:
        async with mcp.ClientSession(*streams) as session:
            await session.initialize()
            tools_result = await session.list_tools()
            return tools_result.tools

# --- Call a specific tool by name ---
async def call_linkedin_tool(tool_name, tool_args):
    async with stdio_client(params) as streams:
        async with mcp.ClientSession(*streams) as session:
            await session.initialize()
            result = await session.call_tool(tool_name, tool_args)
            return result

# --- Get tools in OpenAI-compatible format ---
async def get_linkedin_tools_openai():
    openai_tools = []
    for tool in await list_linkedin_tools():
        schema = {**tool.inputSchema, "additionalProperties": False}
        openai_tool = FunctionTool(
            name=tool.name,
            description=tool.description,
            params_json_schema=schema,
            on_invoke_tool=lambda ctx, args, toolname=tool.name: call_linkedin_tool(toolname, json.loads(args))
        )
        openai_tools.append(openai_tool)
    return openai_tools
