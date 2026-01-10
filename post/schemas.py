from pydantic import BaseModel, Field
from typing import Literal, Optional

class LinkedInPostRequest(BaseModel):
    caption: str = Field(description="The final polished caption text")
    file_path: str = Field(description="The local file path for the media")
    mode: Literal["now", "schedule"] = Field(description="Execution mode")
    scheduled_time: Optional[str] = Field(
        description="ISO 8601 formatted time string. MUST be null if mode is 'now'.",
        default=None
    )