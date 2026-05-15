from flask import Flask, jsonify
from flask_cors import CORS
import os
from .database import engine, Base
from .routers import expenses, analytics, insights

def create_app():
    app = Flask(__name__)
    
    # Enable CORS
    CORS(app, resources={r"/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]}})

    # Create database tables
    with app.app_context():
        try:
            Base.metadata.create_all(bind=engine)
        except Exception as e:
            print(f"Database creation error: {e}")

    # Register blueprints
    app.register_blueprint(expenses.router)
    app.register_blueprint(analytics.router)
    app.register_blueprint(insights.router)

    @app.route("/")
    def root():
        return jsonify({
            "message": "Welcome to Financially API (Flask)",
            "status": "running"
        })

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
