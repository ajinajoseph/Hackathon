from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date
from typing import List
from ..database import get_db
from ..models import Expense
from ..schemas import AnalyticsSummary, CategoryBreakdown, MonthlyTrend

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/", response_model=AnalyticsSummary)
@router.get("/summary", response_model=AnalyticsSummary)
def get_summary(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    if not expenses:
        return AnalyticsSummary(
            total_expenses=0,
            monthly_spending=0,
            category_breakdown=[],
            average_spending=0,
            highest_expense=0,
            transaction_count=0
        )

    total = sum(e.amount for e in expenses)
    count = len(expenses)
    avg = total / count
    highest = max(e.amount for e in expenses)
    
    # Current month spending
    current_month = datetime.now().month
    current_year = datetime.now().year
    monthly_spending = sum(
        e.amount for e in expenses 
        if e.date.month == current_month and e.date.year == current_year
    )
    
    # Category breakdown
    cat_query = db.query(
        Expense.category, func.sum(Expense.amount)
    ).group_by(Expense.category).all()
    
    category_breakdown = [
        CategoryBreakdown(name=cat, value=float(val)) for cat, val in cat_query
    ]
    
    return AnalyticsSummary(
        total_expenses=total,
        monthly_spending=monthly_spending,
        category_breakdown=category_breakdown,
        average_spending=avg,
        highest_expense=highest,
        transaction_count=count
    )

@router.get("/monthly-trends", response_model=List[MonthlyTrend])
def get_monthly_trends(db: Session = Depends(get_db)):
    # Group by month (SQLite format: YYYY-MM)
    trends = db.query(
        func.strftime("%Y-%m", Expense.date).label("month"),
        func.sum(Expense.amount).label("total")
    ).group_by("month").order_by("month").all()
    
    return [MonthlyTrend(month=m, value=float(t)) for m, t in trends]

@router.get("/category-breakdown", response_model=List[CategoryBreakdown])
def get_category_breakdown(db: Session = Depends(get_db)):
    cat_query = db.query(
        Expense.category, func.sum(Expense.amount)
    ).group_by(Expense.category).all()
    
    return [CategoryBreakdown(name=cat, value=float(val)) for cat, val in cat_query]
