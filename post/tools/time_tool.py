# import dateparser
# from datetime import datetime, timedelta
# from agents import function_tool

# @function_tool
# def parse_time_tool(natural_time: str, country_code: str = "US") -> str:
#     """
#     Converts natural language time to ISO 8601 format.
#     """
#     print(f"🕒 TOOL: Parsing '{natural_time}' for '{country_code}'")
    
#     settings = {
#         'PREFER_DATES_FROM': 'future', 
#         'RETURN_AS_TIMEZONE_AWARE': True, 
#         'TO_TIMEZONE': 'UTC'
#     }
    
#     parsed_date = dateparser.parse(natural_time, settings=settings)
    
#     if not parsed_date:
#         return "ERROR: Could not parse date. Ask user for clarification."
    
#     # Ensure time is in the future (1 min buffer)
#     if parsed_date < datetime.now(parsed_date.tzinfo) + timedelta(minutes=1):
#         return "ERROR: Time is in the past. Ask user for a future time."

#     return parsed_date.isoformat()


import dateparser
from datetime import datetime, timedelta, timezone
from agents import function_tool

@function_tool
def parse_time_tool(natural_time: str, country_code: str = "PK") -> str: # Default to PK
    """
    Converts natural language time to ISO 8601 format using local timezone logic.
    """
    print(f"🕒 TOOL: Parsing '{natural_time}' for '{country_code}'")
    
    # We remove 'TO_TIMEZONE': 'UTC' to keep your local time offset (+05:00)
    settings = {
        'PREFER_DATES_FROM': 'future', 
        'RETURN_AS_TIMEZONE_AWARE': True,
    }
    
    parsed_date = dateparser.parse(natural_time, settings=settings)
    
    if not parsed_date:
        return "ERROR: Could not parse date. Ask user for clarification."
    
    # Use UTC for the 'future check' calculation to avoid local clock errors
    now_utc = datetime.now(timezone.utc)
    target_utc = parsed_date.astimezone(timezone.utc)

    # 1 min buffer to ensure the user isn't picking 'now'
    if target_utc < now_utc + timedelta(minutes=1):
        return "ERROR: Time is too close to now or in the past. Pick a time at least 2 mins away."

    return parsed_date.isoformat()