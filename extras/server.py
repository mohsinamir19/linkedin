# server.py
from mcp.server.fastmcp import FastMCP
from post import linkedin_post  # Import your existing function

mcp = FastMCP("linkedin_server")

@mcp.tool()
async def post_linkedin(email: str, password: str, caption_text: str, file_path: str) -> str:
    """
    MCP tool to post a caption and media to LinkedIn using the existing linkedin_post function.
    """
    result = await linkedin_post(email, password, caption_text, file_path)
    return result

if __name__ == "__main__":
    mcp.run(transport="stdio")
