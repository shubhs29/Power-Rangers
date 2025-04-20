from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import SessionLocal
from models import EnergyUsage
from llm_openAI import generate_summary_from_db, generate_energy_tip
from analyzer import analyze_energy_usage_from_db

LLMrouter = APIRouter(prefix="/llm", tags=["LLM"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from analyzer import analyze_energy_usage_from_db

@LLMrouter.get("/smart-tip")
async def get_smart_energy_tip(period: str = "daily", db: Session = Depends(get_db)):
    days = 1 if period == "daily" else 7
    result = analyze_energy_usage_from_db(db, days)
    tip = generate_energy_tip(result, period)
    return {"tip": tip}

