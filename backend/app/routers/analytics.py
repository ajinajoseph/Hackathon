from flask import Blueprint, jsonify
from sqlalchemy import func
from datetime import datetime
from ..database import SessionLocal
from ..models import Expense
from ..schemas import AnalyticsSummary, CategoryBreakdown, MonthlyTrend

router = Blueprint("analytics", __name__, url_prefix="/analytics")

@router.route("", methods=["GET"])
@router.route("/", methods=["GET"])
@router.route("/summary", methods=["GET"])
def get_summary():
    db = SessionLocal()
    expenses = db.query(Expense).all()
    if not expenses:
        db.close()
        return jsonify(AnalyticsSummary(
            total_expenses=0,
            monthly_spending=0,
            category_breakdown=[],
            average_spending=0,
            highest_expense=0,
            transaction_count=0
        ).dict())

    total = sum(e.amount for e in expenses)
    count = len(expenses)
    avg = total / count
    highest = max(e.amount for e in expenses)
    
    current_month = datetime.now().month
    current_year = datetime.now().year
    monthly_spending = sum(
        e.amount for e in expenses 
        if e.date.month == current_month and e.date.year == current_year
    )
    
    cat_query = db.query(
        Expense.category, func.sum(Expense.amount)
    ).group_by(Expense.category).all()
    
    category_breakdown = [
        CategoryBreakdown(name=cat, value=float(val)).dict() for cat, val in cat_query
    ]
    
    summary = AnalyticsSummary(
        total_expenses=total,
        monthly_spending=monthly_spending,
        category_breakdown=category_breakdown,
        average_spending=avg,
        highest_expense=highest,
        transaction_count=count
    )
    db.close()
    return jsonify(summary.dict())

@router.route("/monthly-trends", methods=["GET"])
def get_monthly_trends():
    db = SessionLocal()
    trends = db.query(
        func.strftime("%Y-%m", Expense.date).label("month"),
        func.sum(Expense.amount).label("total")
    ).group_by("month").order_by("month").all()
    
    result = [MonthlyTrend(month=m, value=float(t)).dict() for m, t in trends]
    db.close()
    return jsonify(result)

@router.route("/category-breakdown", methods=["GET"])
def get_category_breakdown():
    db = SessionLocal()
    cat_query = db.query(
        Expense.category, func.sum(Expense.amount)
    ).group_by(Expense.category).all()
    
    result = [CategoryBreakdown(name=cat, value=float(val)).dict() for cat, val in cat_query]
    db.close()
    return jsonify(result)
