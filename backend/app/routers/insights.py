from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Expense
from ..services.ai_service import ai_service
from ..schemas import InsightResponse

router = APIRouter(prefix="/insights", tags=["insights"])

@router.get("/", response_model=List[InsightResponse])
async def get_ai_insights(db: Session = Depends(get_db)):
    # Fetch recent expenses to analyze
    expenses = db.query(Expense).order_by(Expense.date.desc()).limit(50).all()
    
    # Convert to list of dicts for AI service
    expenses_data = [
        {
            "amount": e.amount,
            "category": e.category,
            "date": str(e.date),
            "notes": e.notes
        } for e in expenses
    ]
    
    insights = await ai_service.get_insights(expenses_data)
    return insights
