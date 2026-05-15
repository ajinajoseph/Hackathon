import os
import json
from typing import List
from ..schemas import InsightResponse
try:
    import openai
except ImportError:
    openai = None

try:
    import google.generativeai as genai
except ImportError:
    genai = None

from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        
        if self.openai_api_key and openai:
            openai.api_key = self.openai_api_key
        if self.gemini_api_key and genai:
            try:
                genai.configure(api_key=self.gemini_api_key)
            except Exception as e:
                print(f"Gemini Config Error: {e}")
                genai = None

    async def get_insights(self, expenses_data: List[dict]) -> List[InsightResponse]:
        """
        Generates financial insights based on expense data.
        Tries OpenAI first, then Gemini, then fallbacks to mock data.
        """
        if not expenses_data:
            return self._get_fallback_insights()

        prompt = f"""
        Analyze the following personal expenses and provide 3-4 actionable financial insights.
        Return the result as a JSON list of objects with 'title', 'description', and 'type' (warning, recommendation, or tip).
        
        Data: {json.dumps(expenses_data)}
        """

        # Try OpenAI
        if self.openai_api_key and openai:
            try:
                response = await openai.ChatCompletion.acreate(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": prompt}]
                )
                return json.loads(response.choices[0].message.content)
            except Exception as e:
                print(f"OpenAI Error: {e}")

        # Try Gemini
        if self.gemini_api_key and genai:
            try:
                model = genai.GenerativeModel('gemini-pro')
                response = model.generate_content(prompt)
                # Clean up markdown JSON if present
                content = response.text.replace("```json", "").replace("```", "").strip()
                return json.loads(content)
            except Exception as e:
                print(f"Gemini Error: {e}")

        # Fallback to Mock
        return self._get_fallback_insights(expenses_data)

    def _get_fallback_insights(self, expenses_data: List[dict] = None) -> List[InsightResponse]:
        if not expenses_data:
            return [
                InsightResponse(title="Welcome to Financially", description="Add your first expense to see AI-powered insights.", type="tip"),
            ]
        
        total = sum(e['amount'] for e in expenses_data)
        categories = {}
        for e in expenses_data:
            categories[e['category']] = categories.get(e['category'], 0) + e['amount']
        
        top_category = max(categories, key=categories.get) if categories else "N/A"
        
        return [
            InsightResponse(
                title="Spending Habit", 
                description=f"Your highest spending category is {top_category}. Consider setting a budget for it.", 
                type="recommendation"
            ),
            InsightResponse(
                title="Monthly Progress", 
                description=f"You have tracked {len(expenses_data)} transactions this month totaling ${total:.2f}.", 
                type="tip"
            ),
            InsightResponse(
                title="Overspending Alert", 
                description="Food & Dining expenses are 15% higher than last week. Watch your weekend spending.", 
                type="warning"
            )
        ]

ai_service = AIService()
