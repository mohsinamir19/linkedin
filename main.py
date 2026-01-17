import uvicorn
from fastapi import FastAPI
from post.api import router as post_router
from analytics.api import router as analytics_router
from lead.api import router as lead_router
from post.scheduler.api import router as scheduler_router
import sys
import asyncio
import sys
import asyncio

if sys.platform.startswith("win"):
    # Fix for Playwright subprocess NotImplementedError on Windows
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LinkedIn AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],   # 👈 allows OPTIONS, GET, POST
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "LinkedIn AI Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}


app.include_router(post_router)

app.include_router(analytics_router)

app.include_router(lead_router)

app.include_router(scheduler_router)



def run():
    uvicorn.run(
        "main:app",        # 👈 IMPORTANT: module:app
        host="127.0.0.1",
        port=8000,
        reload=True
    )

if __name__ == "__main__":
    run()
