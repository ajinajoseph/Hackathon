from pydantic import BaseModel, Field, validator
from datetime import date, datetime
from typing import List, Optional, Dict

class ExpenseBase(BaseModel):
    amount: float = Field(..., gt=0, description="The amount must be greater than 0")
    category: str
    date: date
    notes: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[str] = None
    date: Optional[date] = None
    notes: Optional[str] = None

class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CategoryBreakdown(BaseModel):
    name: str
    value: float
    color: Optional[str] = None

class MonthlyTrend(BaseModel):
    month: str
    value: float

class AnalyticsSummary(BaseModel):
    total_expenses: float
    monthly_spending: float
    category_breakdown: List[CategoryBreakdown]
    average_spending: float
    highest_expense: float
    transaction_count: int

class InsightResponse(BaseModel):
    title: str
    description: str
    type: str # warning, recommendation, tip
    icon: Optional[str] = None
