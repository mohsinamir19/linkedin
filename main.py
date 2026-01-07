import uvicorn
from fastapi import FastAPI
from post.api import router as post_router

app = FastAPI(title="LinkedIn AI Backend")

@app.get("/")
async def root():
    return {"message": "LinkedIn AI Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

app.include_router(post_router)

def run():
    uvicorn.run(
        "main:app",        # 👈 IMPORTANT: module:app
        host="127.0.0.1",
        port=8000,
        reload=True
    )

if __name__ == "__main__":
    run()
