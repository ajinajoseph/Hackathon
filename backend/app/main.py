from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import expenses, analytics, insights

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Financially API",
    description="Production-ready backend for personal finance management",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(expenses.router)
app.include_router(analytics.router)
app.include_router(insights.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Financially API",
        "docs": "/docs",
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
