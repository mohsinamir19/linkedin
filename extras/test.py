from datetime import datetime, timedelta
import asyncio
from agents_1.post_agent import handle_post_request

async def test_schedule():
    # Schedule 1 minute from now
    run_at = (datetime.now() + timedelta(minutes=10)).isoformat()

    response = await handle_post_request(
        caption="Test scheduled post",
        file_path=r"C:\Users\sbato\OneDrive\Desktop\linkedin\post\linkedin_error.png",
        mode="schedule",
        scheduled_time=run_at
    )
    print("Schedule response:", response)

asyncio.run(test_schedule())
