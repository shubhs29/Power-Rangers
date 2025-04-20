from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import SessionLocal
from models import EnergyUsage, ClusterInsights
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime
import calendar
import random
import plotly.express as px



insightRouter = APIRouter()

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@insightRouter.get("/forecast-bill")
def forecast_bill(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    df['timestamp'] = pd.to_datetime(df['timestamp'])  # Ensure datetime
    df['month'] = df['timestamp'].dt.month

    monthly_costs = df.groupby('month')['estimated_cost'].sum().reset_index()

    model = LinearRegression()
    X = monthly_costs[['month']]
    y = monthly_costs['estimated_cost']
    model.fit(X, y)

    next_month = (datetime.now().month % 12) + 1
    future_cost = model.predict(pd.DataFrame([[next_month]], columns=['month']))[0]

    # Add prediction to monthly_costs for plotting
    monthly_costs['month_name'] = monthly_costs['month'].apply(lambda m: calendar.month_name[m])
    prediction_entry = {
        "month": next_month,
        "month_name": calendar.month_name[next_month],
        "estimated_cost": round(future_cost, 2),
        "predicted": True
    }

    # Convert existing to list of dicts
    history = monthly_costs.to_dict(orient="records")
    for h in history:
        h["predicted"] = False

    return {
        "graph_data": history + [prediction_entry],
        "next_month_prediction": {
            "month": calendar.month_name[next_month],
            "predicted_cost": round(future_cost, 2)
        }
    }

from datetime import datetime, timedelta

@insightRouter.get("/weekly-savings")
def weekly_savings(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['week'] = df['timestamp'].dt.isocalendar().week

    current_week = datetime.now().isocalendar()[1]
    last_week = current_week - 1

    current_week_cost = df[df['week'] == current_week]['estimated_cost'].sum()
    last_week_cost = df[df['week'] == last_week]['estimated_cost'].sum()

    if last_week_cost == 0:
        return {"message": "Not enough data from last week to compare."}

    cost_diff = last_week_cost - current_week_cost
    percent_diff = (cost_diff / last_week_cost) * 100

    return {
        "current_week_cost": round(current_week_cost, 2),
        "last_week_cost": round(last_week_cost, 2),
        "savings": round(cost_diff, 2),
        "percent_reduction": round(percent_diff, 2),
        "message": f"You’ve reduced usage by {round(percent_diff, 1)}% this week — saving ₹{round(cost_diff, 0)}!"
    }


@insightRouter.get("/wastage-trend")
def wastage_prediction_trend(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['day'] = df['timestamp'].dt.date

    # Wastage logic: AC/Light running more than 4 hrs/day or when temp < 24°C
    df['wastage'] = df.apply(
        lambda row: row['estimated_cost']
        if (row['appliance'] in ['AC', 'Light']) and
           (row['duration_hrs'] > 4 or row['outside_temperature'] < 24)
        else 0,
        axis=1
    )

    # Actual and potential optimized cost
    daily_wastage = df.groupby('day')['wastage'].sum().reset_index()
    daily_wastage['optimized'] = daily_wastage['wastage'] * 0.3  # Assume 70% can be saved

    return {
        "wastage_trend": daily_wastage.to_dict("records"),
        "message": f"You may waste ₹{round(daily_wastage['wastage'].sum(), 0)} this week from idle AC and lights."
    }

@insightRouter.get("/top-appliances")
def top_appliances(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    grouped = (
        df.groupby("appliance")["estimated_cost"]
        .sum()
        .sort_values(ascending=False)
        .reset_index()
        .head(3)  # Change to .head(4) if you want top 4
    )

    return grouped.to_dict("records")


@insightRouter.get("/compare-trend")
def historical_comparison(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    df['month'] = df['timestamp'].apply(lambda x: x.month)
    monthly = df.groupby('month')['estimated_cost'].sum().reset_index()
    monthly = monthly.sort_values("month")

    # Calculate percentage change from previous month
    monthly['percent_change'] = monthly['estimated_cost'].pct_change().fillna(0) * 100
    monthly['percent_change'] = monthly['percent_change'].round(2)

    # Optional: convert month number to name
    monthly['month'] = monthly['month'].apply(lambda x: calendar.month_name[x])

    return monthly.to_dict("records")


@insightRouter.get("/peak-usage")
def peak_hours_usage(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    df['hour'] = df['timestamp'].dt.hour
    peak = df[df['hour'].between(18, 22)]  # 6 PM to 10 PM

    total_cost = df['estimated_cost'].sum()
    total_peak_cost = peak['estimated_cost'].sum()
    total_peak_kwh = peak['power_usage_kWh'].sum()

    return {
        "peak_hour_range": "6 PM to 10 PM",
        "peak_hour_power_kWh": round(total_peak_kwh, 2),
        "tip": "Cutting TV time to 2 hours in peak hours saves cash and your eyes!"
    }


@insightRouter.get("/savings-summary")
def savings_summary(db: Session = Depends(get_db)):
    data = db.query(EnergyUsage).all()
    df = pd.DataFrame([d.__dict__ for d in data])

    if df.empty:
        return {"message": "No energy data available."}

    # Feature engineering: Calculate usage reduction, potential savings, etc.
    df['estimated_savings'] = 0  # Initialize savings column

    # Example of a heuristic for savings calculation: 
    # For simplicity, assume that by reducing the usage of high-cost appliances by 10%, savings can be calculated.
    high_cost_appliances = ['AC', 'Washing Machine', 'Heater']
    for appliance in high_cost_appliances:
        appliance_data = df[df['appliance'] == appliance]
        savings_for_appliance = appliance_data['estimated_cost'] * 0.10  # 10% reduction savings
        df.loc[df['appliance'] == appliance, 'estimated_savings'] = savings_for_appliance

    total_savings = df['estimated_savings'].sum()

    return {"total_saved": round(total_savings, 2)}

@insightRouter.get("/appliance-efficiency-insights")
def appliance_efficiency_insights(db: Session = Depends(get_db)):
    records = db.query(EnergyUsage).all()
    if not records:
        return []

    # Prepare data
    data = [{
        "timestamp": record.timestamp,
        "appliance": record.appliance,
        "power_usage_kWh": record.power_usage_kWh
    } for record in records if record.timestamp and record.appliance]

    df = pd.DataFrame(data)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['date'] = df['timestamp'].dt.date

    # Daily usage per appliance
    daily_usage = df.groupby(['appliance', 'date'])['power_usage_kWh'].sum().reset_index()

    # Historical average usage
    appliance_avg = daily_usage.groupby('appliance')['power_usage_kWh'].mean()

    # Today's usage
    today = datetime.now().date()
    today_usage = daily_usage[daily_usage['date'] == today]

    insights = []
    for _, row in today_usage.iterrows():
        appliance = row['appliance']
        actual = row['power_usage_kWh']
        avg = appliance_avg.get(appliance, 0)

        threshold = avg * 1.1
        status = "Overused" if actual > threshold else "Efficient"
        suggestion = "Reduce usage or check for appliance issues." if status == "Overused" else "Usage is within optimal range."

        insights.append({
            "appliance": appliance,
            "actual_usage_kWh": round(actual, 2),
            "average_usage_kWh": round(avg, 2),
            "status": status,
            "suggestion": suggestion
        })

    return insights



@insightRouter.get("/rooms-appliances-overview")
def rooms_appliances_overview(db: Session = Depends(get_db)):
    # Fetch all energy usage data from the database
    data = db.query(EnergyUsage).all()

    # Convert the data to a DataFrame
    df = pd.DataFrame([d.__dict__ for d in data])

    # Check if DataFrame is empty
    if df.empty:
        return {"message": "No energy data available."}

    # Ensure the timestamp column is in datetime format
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    # Extract month and year from the timestamp for grouping
    df['month'] = df['timestamp'].dt.month
    df['year'] = df['timestamp'].dt.year

    # Group the data by room, month, and year, and sum up the power usage
    room_usage = df.groupby(["room", "month", "year"])["power_usage_kWh"].sum().reset_index()

    # Now, summarize the usage by room
    room_usage_summary = room_usage.groupby(["room"])["power_usage_kWh"].sum().reset_index()

    # Check if room data exists before generating the chart
    if room_usage_summary.empty:
        return {"message": "No room data available to display."}

    # Create a pie chart to visualize the room-wise usage
    fig = px.pie(room_usage_summary, names="room", values="power_usage_kWh", hole=0.3,
                 title="Room-wise Appliance Usage Overview (Monthly)")

    # Return the chart as HTML
    return {"chart": fig.to_html()}
