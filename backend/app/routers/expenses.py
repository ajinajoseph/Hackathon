from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from datetime import date
from ..database import SessionLocal
from ..models import Expense
from ..schemas import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from pydantic import ValidationError

router = Blueprint("expenses", __name__, url_prefix="/expenses")

def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        pass # Session closing handled at request teardown or manually

@router.route("", methods=["GET"])
@router.route("/", methods=["GET"])
def read_expenses():
    db = SessionLocal()
    category = request.args.get("category")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    
    query = db.query(Expense)
    
    if category:
        query = query.filter(Expense.category == category)
    if start_date:
        query = query.filter(Expense.date >= date.fromisoformat(start_date))
    if end_date:
        query = query.filter(Expense.date <= date.fromisoformat(end_date))
        
    expenses = query.order_by(Expense.date.desc()).all()
    result = [ExpenseResponse.from_orm(e).dict() for e in expenses]
    db.close()
    return jsonify(result)

@router.route("", methods=["POST"])
@router.route("/", methods=["POST"])
def create_expense():
    db = SessionLocal()
    try:
        data = request.get_json()
        expense_create = ExpenseCreate(**data)
        db_expense = Expense(**expense_create.dict())
        db.add(db_expense)
        db.commit()
        db.refresh(db_expense)
        result = ExpenseResponse.from_orm(db_expense).dict()
        return jsonify(result), 201
    except ValidationError as e:
        return jsonify(e.errors()), 400
    finally:
        db.close()

@router.route("/<int:expense_id>", methods=["GET"])
def read_expense(expense_id):
    db = SessionLocal()
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    db.close()
    if db_expense is None:
        return jsonify({"detail": "Expense not found"}), 404
    return jsonify(ExpenseResponse.from_orm(db_expense).dict())

@router.route("/<int:expense_id>", methods=["PUT"])
def update_expense(expense_id):
    db = SessionLocal()
    try:
        db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
        if db_expense is None:
            return jsonify({"detail": "Expense not found"}), 404
        
        data = request.get_json()
        expense_update = ExpenseUpdate(**data)
        update_data = expense_update.dict(exclude_unset=True)
        
        for key, value in update_data.items():
            setattr(db_expense, key, value)
        
        db.commit()
        db.refresh(db_expense)
        result = ExpenseResponse.from_orm(db_expense).dict()
        return jsonify(result)
    except ValidationError as e:
        return jsonify(e.errors()), 400
    finally:
        db.close()

@router.route("/<int:expense_id>", methods=["DELETE"])
def delete_expense(expense_id):
    db = SessionLocal()
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense is None:
        db.close()
        return jsonify({"detail": "Expense not found"}), 404
    
    db.delete(db_expense)
    db.commit()
    db.close()
    return jsonify({"message": "Expense deleted successfully"})
