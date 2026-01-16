import dateparser
from datetime import datetime, timedelta
from agents import function_tool

@function_tool
def parse_time_tool(natural_time: str, country_code: str = "US") -> str:
    """
    Converts natural language time to ISO 8601 format.
    """
    print(f"🕒 TOOL: Parsing '{natural_time}' for '{country_code}'")
    
    settings = {
        'PREFER_DATES_FROM': 'future', 
        'RETURN_AS_TIMEZONE_AWARE': True, 
        'TO_TIMEZONE': 'UTC'
    }
    
    parsed_date = dateparser.parse(natural_time, settings=settings)
    
    if not parsed_date:
        return "ERROR: Could not parse date. Ask user for clarification."
    
    # Ensure time is in the future (1 min buffer)
    if parsed_date < datetime.now(parsed_date.tzinfo) + timedelta(minutes=1):
        return "ERROR: Time is in the past. Ask user for a future time."

    return parsed_date.isoformat()