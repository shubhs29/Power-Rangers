from fastapi import APIRouter
from sqlalchemy.orm import Session
from db import SessionLocal
from models import EnergyUsage
import pandas as pd

kpi = APIRouter()

def get_df():
    session: Session = SessionLocal()
    data = session.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])
    df.drop("_sa_instance_state", axis=1, inplace=True)
    session.close()
    return df

@kpi.get("/kpis")
def get_kpis():
    df = get_df()

    # Convert timestamp to datetime if not already
    df["timestamp"] = pd.to_datetime(df["timestamp"])

    # KPI 1: Total Energy Consumption
    total_usage = round(df["power_usage_kWh"].sum(), 2)

    # KPI 2: Total Estimated Cost
    total_cost = round(df["estimated_cost"].sum(), 2)

    # KPI 3: Average Daily Consumption
    avg_daily_usage = round(df.groupby(df["timestamp"].dt.date)["power_usage_kWh"].sum().mean(), 2)

    # KPI 4: Number of Wasteful Entries
    wasteful_count = df[df["label"] == "Wasteful"].shape[0] if "label" in df.columns else 0

    # KPI 5: Most Active Appliance
    top_appliance = df["appliance"].value_counts().idxmax()

    # KPI 6: Room with Highest Energy Use
    top_room = df.groupby("room")["power_usage_kWh"].sum().idxmax()

    return {
        "total_energy_consumed_kWh": total_usage,
        "total_estimated_cost": total_cost,
        "average_daily_usage_kWh": avg_daily_usage,
        "wasteful_entries_count": wasteful_count,
        "most_active_appliance": top_appliance,
        "highest_energy_room": top_room
    }
