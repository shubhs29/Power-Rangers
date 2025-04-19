from fastapi import APIRouter
from sqlalchemy.orm import Session
from db import SessionLocal
from models import EnergyUsage, ClusterInsights
from datetime import datetime
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans

label_router = APIRouter()

@label_router.post("/apply-labels")
def apply_ai_labels():
    session: Session = SessionLocal()
    updated = 0

    try:
        records = session.query(EnergyUsage).all()

        for record in records:
            if record.label:
                continue

            hour = record.timestamp.hour
            duration = record.duration_hrs
            temp = record.outside_temperature
            appliance = record.appliance.lower()
            label = "Normal"

            # Wasteful cases
            if appliance in ["ac", "heater"] and (hour < 6 or hour > 23) and duration > 3 and (
                (appliance == "ac" and temp < 30) or (appliance == "heater" and temp > 18)):
                label = "Wasteful"

            elif appliance in ["tv", "light", "fan"] and duration > 5:
                label = "Wasteful"

            elif appliance in ["microwave", "oven", "washing machine", "dishwasher"] and hour < 5:
                label = "Wasteful"

            # Optimal cases
            elif appliance == "tv" and 18 <= hour <= 22 and 1 <= duration <= 3:
                label = "Optimal"
            elif appliance == "heater" and temp <= 15 and 5 <= hour <= 9 and duration <= 2:
                label = "Optimal"
            elif appliance == "ac" and temp >= 30 and 12 <= hour <= 17 and duration <= 3:
                label = "Optimal"
            elif appliance in ["light", "fan"] and 18 <= hour <= 22 and duration <= 3:
                label = "Optimal"

            record.label = label
            updated += 1

        session.commit()
        return {"message": f"Labels applied to {updated} records."}
    except Exception as e:
        session.rollback()
        return {"error": str(e)}
    finally:
        session.close()


@label_router.post("/apply-clustering")
def apply_clustering():
    session = SessionLocal()
    try:
        records = session.query(EnergyUsage).all()

        data = [{
            "appliance": r.appliance,
            "duration": r.duration_hrs,
            "power": r.power_usage_kWh,
            "temperature": r.outside_temperature,
            "hour": r.timestamp.hour
        } for r in records]

        df = pd.DataFrame(data)

        features = df[["duration", "power", "temperature", "hour"]]
        kmeans = KMeans(n_clusters=3, random_state=42).fit(features)
        df["cluster"] = kmeans.labels_

        session.query(ClusterInsights).delete()

        grouped = df.groupby(["appliance", "cluster"]).agg({
            "duration": "mean",
            "power": "mean",
            "temperature": "mean",
            "hour": "mean"
        }).reset_index()

        for _, row in grouped.iterrows():
            pattern = get_usage_pattern(row["power"], row["duration"])
            session.add(ClusterInsights(
                appliance=row["appliance"],
                cluster_label=int(row["cluster"]),
                avg_duration=round(row["duration"], 2),
                avg_power_usage=round(row["power"], 2),
                avg_temperature=round(row["temperature"], 2),
                avg_hour=round(row["hour"], 2),
                usage_pattern=pattern
            ))

        session.commit()
        return {"message": "Clustering applied and insights saved."}
    except Exception as e:
        session.rollback()
        return {"error": str(e)}
    finally:
        session.close()



def get_usage_pattern(avg_power, avg_duration):
    if avg_power > 8 or avg_duration > 4:
        return "Wasteful Usage"
    elif avg_power < 3 and avg_duration <= 2:
        return "Optimal Usage"
    else:
        return "Normal Usage"

