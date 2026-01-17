import sys
import asyncio
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# 1. Load environment variables IMMEDIATELY
load_dotenv()

# 2. WINDOWS PLAYWRIGHT FIX
# This must be set before any other async code runs.
if sys.platform.startswith("win"):
    try:
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
        print("✅ Windows Proactor Event Loop Policy set.")
    except Exception as e:
        print(f"⚠️ Failed to set Event Loop Policy: {e}")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 3. Import Routers (Ensure these paths match your folder structure)
from post.api import router as post_router
from analytics.api import router as analytics_router
from lead.api import router as lead_router
from post.scheduler.api import router as scheduler_router

# 4. Lifespan for Startup/Shutdown tasks
@asynccontextmanager
async def lifespan(app: FastAPI):
    # This runs when the server starts
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ WARNING: OPENAI_API_KEY is not set in .env file!")
    else:
        print("✅ OpenAI API Key detected.")
    
    print("🚀 LinkedIn AI Backend is starting up...")
    yield
    # This runs when the server stops
    print("🛑 LinkedIn AI Backend is shutting down...")

app = FastAPI(title="LinkedIn AI Backend", lifespan=lifespan)

# 5. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 6. Include all Routers
app.include_router(post_router)
app.include_router(analytics_router)
app.include_router(lead_router)
app.include_router(scheduler_router)

@app.get("/")
async def root():
    return {"message": "LinkedIn AI Backend is running"}

# 7. Run the Server
if __name__ == "__main__":
    import uvicorn
    
    # ⚠️ CRITICAL WINDOWS NOTE: 
    # Use reload=False if you continue to see 'NotImplementedError'.
    # Sometimes Uvicorn's reloader overrides the Event Loop Policy.
    uvicorn.run(
        "main:app", 
        host="127.0.0.1", 
        port=8000, 
        reload=False  # Changed to False for stability on Windows
    )