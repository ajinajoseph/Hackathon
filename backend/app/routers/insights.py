from flask import Blueprint, jsonify
from ..database import SessionLocal
from ..models import Expense
from ..services.ai_service import ai_service
from ..schemas import InsightResponse
import asyncio

router = Blueprint("insights", __name__, url_prefix="/insights")

@router.route("", methods=["GET"])
@router.route("/", methods=["GET"])
def get_ai_insights():
    db = SessionLocal()
    expenses = db.query(Expense).order_by(Expense.date.desc()).limit(50).all()
    
    expenses_data = [
        {
            "amount": e.amount,
            "category": e.category,
            "date": str(e.date),
            "notes": e.notes
        } for e in expenses
    ]
    
    # Flask is synchronous by default, so we run the async AI service in an event loop
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    insights = loop.run_until_complete(ai_service.get_insights(expenses_data))
    loop.close()
    
    result = [i.dict() if hasattr(i, 'dict') else i for i in insights]
    db.close()
    return jsonify(result)
