from sqlalchemy.orm import Session
from models import EnergyUsage
from datetime import datetime, timedelta

def analyze_energy_usage_from_db(db: Session, days: int = 1):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)

    records = db.query(EnergyUsage).filter(EnergyUsage.timestamp >= start_date).all()

    usage_summary = {}
    for record in records:
        device = record.appliance
        if device not in usage_summary:
            usage_summary[device] = {
                "total_usage": 0,
                "active_hours": set()
            }

        usage_summary[device]["total_usage"] += record.power_usage_kWh
        usage_summary[device]["active_hours"].add(record.timestamp.hour)

    # Convert sets to lists
    for device in usage_summary:
        usage_summary[device]["active_hours"] = list(usage_summary[device]["active_hours"])

    # Identify wastage
    wastage = []
    for device, data in usage_summary.items():
        if device == "AC" and any(hour > 1 for hour in data['active_hours']):
            wastage.append({
                "device": device,
                "issue": "Running all night",
                "consumption": data["total_usage"]
            })

    return {
        "summary": usage_summary,
        "wastage": wastage
    }
