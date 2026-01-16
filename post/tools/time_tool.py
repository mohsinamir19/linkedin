import dateparser
from datetime import datetime, timedelta
from agents import function_tool

@function_tool
def parse_time_tool(natural_time: str) -> str:
    """
    Converts natural language time to ISO 8601 format.
    Always uses Pakistan timezone (Asia/Karachi).
    """
    print("🛠️ PARSE_TIME_TOOL: Called")
    print(f"🕒 PARSE_TIME_TOOL: Input natural_time = '{natural_time}'")

    # Always Pakistan timezone
    settings = {
        'PREFER_DATES_FROM': 'future',
        'RETURN_AS_TIMEZONE_AWARE': True,
        'TIMEZONE': 'Asia/Karachi',
        'TO_TIMEZONE': 'Asia/Karachi'
    }

    print(f"⚙️ PARSE_TIME_TOOL: Dateparser settings → {settings}")

    parsed_date = dateparser.parse(natural_time, settings=settings)

    if not parsed_date:
        print("❌ PARSE_TIME_TOOL ERROR: dateparser failed to parse input")
        return "ERROR: Could not parse date. Ask user for clarification."

    print(f"✅ PARSE_TIME_TOOL: Parsed datetime → {parsed_date.isoformat()}")

    # Future time check (1-minute buffer)
    now = datetime.now(parsed_date.tzinfo)
    print(f"🕒 PARSE_TIME_TOOL: Current time (PK) → {now.isoformat()}")

    if parsed_date < now + timedelta(minutes=1):
        print("❌ PARSE_TIME_TOOL ERROR: Parsed time is in the past or too close")
        return "ERROR: Time is in the past. Ask user for a future time."

    iso_time = parsed_date.isoformat()
    print(f"📤 PARSE_TIME_TOOL: Returning ISO time → {iso_time}")

    return iso_time
