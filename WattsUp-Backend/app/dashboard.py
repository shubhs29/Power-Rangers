from fastapi import APIRouter
from sqlalchemy.orm import Session
from db import SessionLocal
from models import EnergyUsage
import pandas as pd


dashboard = APIRouter()

def get_df():
    session: Session = SessionLocal()
    data = session.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])
    df.drop("_sa_instance_state", axis=1, inplace=True)
    return df


@dashboard.get("/charts")
def get_chart_data():
    df = get_df()

    charts = {}

    # 1. Appliance-wise Power Usage and Cost breakdown
    appliance_group = df.groupby("appliance").agg({"power_usage_kWh": "sum", "estimated_cost": "sum"}).reset_index()
    charts["appliance_power_cost"] = {
        "appliances": appliance_group["appliance"].tolist(),
        "power_usage": appliance_group["power_usage_kWh"].tolist(),
        "costs": appliance_group["estimated_cost"].tolist()
    }

    # 2. Time-of-Day Usage Pattern
    df["hour"] = pd.to_datetime(df["timestamp"]).dt.hour
    hourly = df.groupby("hour")["power_usage_kWh"].sum().reset_index()
    charts["time_of_day"] = {
        "hours": hourly["hour"].tolist(),
        "usage": hourly["power_usage_kWh"].tolist()
    }

    # 3. Room-wise Consumption
    room_group = df.groupby("room")["power_usage_kWh"].sum().reset_index()
    charts["room_consumption"] = {
        "rooms": room_group["room"].tolist(),
        "usage": room_group["power_usage_kWh"].tolist()
    }

    # 4. Appliances by Label
    if "label" in df.columns:
        label_group = df.groupby(["appliance", "label"]).size().unstack(fill_value=0)
        charts["appliance_label"] = {
            "appliances": label_group.index.tolist(),
            "labels": label_group.columns.tolist(),
            "counts": label_group.to_dict(orient="list")
        }

    # 5. Monthly Heatmap (using day instead for now)
    df["day"] = pd.to_datetime(df["timestamp"]).dt.day
    heatmap = df.groupby(["day", "hour"])["power_usage_kWh"].sum().unstack(fill_value=0)
    charts["heatmap"] = {
        "days": heatmap.index.tolist(),
        "hours": heatmap.columns.tolist(),
        "data": heatmap.values.tolist()
    }

    # 6. Daily Total Usage & Cost
    daily = df.groupby(df["timestamp"].dt.date).agg({"power_usage_kWh": "sum", "estimated_cost": "sum"}).reset_index()
    charts["daily_summary"] = {
        "dates": daily["timestamp"].astype(str).tolist(),
        "daily_usage": daily["power_usage_kWh"].tolist(),
        "daily_cost": daily["estimated_cost"].tolist()
    }

    # 7. Top 3 Energy-Consuming Appliances
    top_appliances = appliance_group.sort_values("power_usage_kWh", ascending=False).head(3)
    charts["top_appliances"] = {
        "appliances": top_appliances["appliance"].tolist(),
        "usage": top_appliances["power_usage_kWh"].tolist()
    }

    # 8. Cost Efficiency per Room
    room_efficiency = df.groupby("room").agg({"estimated_cost": "sum", "power_usage_kWh": "sum"}).reset_index()
    room_efficiency["cost_per_kWh"] = room_efficiency["estimated_cost"] / room_efficiency["power_usage_kWh"]
    charts["room_efficiency"] = {
        "rooms": room_efficiency["room"].tolist(),
        "cost_per_kWh": room_efficiency["cost_per_kWh"].round(2).tolist()
    }

    # 9. KPI: Average Daily Usage
    avg_daily = df.groupby(df["timestamp"].dt.date)["power_usage_kWh"].sum()
    charts["avg_daily_usage"] = float(round(avg_daily.mean(), 2))

    # 10. KPI: Number of Optimal Appliance Entries
    if "label" in df.columns:
        optimal_count = df[df["label"] == "Optimal"].shape[0]
        charts["optimal_appliance_count"] = float(optimal_count)

        # 11. KPI: % Optimal Usage
        charts["percent_optimal"] = float(round((optimal_count / df.shape[0]) * 100, 2))

        # 12. KPI: Most Wasteful Appliance
        wasteful_appliance = df[df["label"] == "Wasteful"]["appliance"].value_counts().idxmax()
        charts["most_wasteful_appliance"] = str(wasteful_appliance)

        # 13. KPI: Most Wasteful Hour
        wasteful_hour = df[df["label"] == "Wasteful"]["hour"].value_counts().idxmax()
        charts["most_wasteful_hour"] = str(wasteful_hour)
        # 14. KPI: Room with Most Wastage
        wasteful_room = df[df["label"] == "Wasteful"]["room"].value_counts().idxmax()
        charts["most_wasteful_room"] = str(wasteful_room)

    return charts
