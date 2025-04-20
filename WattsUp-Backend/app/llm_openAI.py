from openai import OpenAI
import os
from sqlalchemy.orm import Session
from models import EnergyUsage
from datetime import datetime, timedelta

client = OpenAI(api_key="OPENAI_API_KEY") 

def generate_summary_from_db(db: Session, period: str = "daily") -> str:
    now = datetime.now()
    if period == "daily":
        start_time = now - timedelta(days=1)
    elif period == "weekly":
        start_time = now - timedelta(weeks=1)
    else:
        start_time = now - timedelta(days=1)  # default

    usage_records = db.query(EnergyUsage).filter(EnergyUsage.timestamp >= start_time).all()

    summary = ""
    for record in usage_records:
        summary += f"- {record.appliance} used for {record.duration_hrs:.2f} hrs in {record.room}, power used: {record.power_usage_kWh:.2f} kWh\n"

    return summary


def generate_energy_tip(data, period):
    user_prompt = f"Period: {period}\nData: {data}\nProvide a smart energy-saving tip."
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an energy usage assistant."},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7
    )

    return response.choices[0].message.content
