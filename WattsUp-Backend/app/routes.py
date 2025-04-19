from fastapi import APIRouter
from sqlalchemy.orm import Session
import random
from datetime import datetime, timedelta
from db import SessionLocal
from models import EnergyUsage
import calendar
import csv

router = APIRouter()

start_date = datetime.today()
end_date = start_date + timedelta(days=100)

appliances = ["AC", "Heater", "TV", "Microwave", "Refrigerator", "Fan", "Light", "Washing Machine", "Dishwasher", "Oven"]
rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Laundry Room", "Dining Room"]

power_ranges = {
    "AC": (2.5, 3.5),
    "Heater": (1.5, 2.5),
    "TV": (0.5, 1.5),
    "Microwave": (0.3, 1.0),
    "Refrigerator": (0.6, 1.0),
    "Fan": (0.1, 0.5),
    "Light": (0.05, 0.2),
    "Washing Machine": (1.0, 2.0),
    "Dishwasher": (1.0, 1.5),
    "Oven": (1.5, 3.0),
}

# Threshold (in total kWh per usage session)
thresholds = {
    "AC": 8.0,
    "Heater": 6.0,
    "TV": 2.5,
    "Microwave": 2.0,
    "Refrigerator": 1.8,
    "Fan": 1.0,
    "Light": 0.6,
    "Washing Machine": 4.0,
    "Dishwasher": 3.0,
    "Oven": 6.0,
}

def generate_random_date(start_date, end_date):
    random_days = random.randint(0, (end_date - start_date).days)
    random_date = start_date + timedelta(days=random_days)
    weekday_name = calendar.day_name[random_date.weekday()]
    return random_date, weekday_name

def generate_raw_entry():
    appliance = random.choice(appliances)
    room = random.choice(rooms)
    hour = random.randint(0, 23)
    duration = random.randint(1, 6)

    power_range = power_ranges.get(appliance, (0.3, 1.8))
    power_usage_per_hour = random.uniform(*power_range)
    total_power_usage = round(duration * power_usage_per_hour, 2)

    estimated_cost = round(total_power_usage * 6, 2)
    threshold = thresholds.get(appliance, 2.0)
    exceeds_threshold = total_power_usage > threshold

    temperature = {
        "AC": random.randint(30, 42),
        "Heater": random.randint(10, 20),
        "Refrigerator": random.randint(4, 8),
        "Fan": random.randint(20, 35),
        "Light": random.randint(20, 35),
        "Washing Machine": random.randint(20, 40),
        "Dishwasher": random.randint(20, 45),
        "Oven": random.randint(100, 250),
    }.get(appliance, random.randint(20, 35))

    random_date, day_of_week = generate_random_date(start_date, end_date)
    timestamp_str = random_date.strftime("%Y-%m-%d") + f" {hour}:00"
    timestamp = datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M")

    return {
        "timestamp": timestamp,
        "appliance": appliance,
        "duration_hrs": duration,
        "room": room,
        "power_usage_kWh": total_power_usage,
        "estimated_cost": estimated_cost,
        "outside_temperature": temperature,
        "day": day_of_week,
        "exceeds_threshold": exceeds_threshold
    }

@router.get("/generate-data")
def generate_data():
    session = SessionLocal()
    try:
        for _ in range(100):
            for _ in range(10):
                entry = generate_raw_entry()

                energy_entry = EnergyUsage(
                    timestamp=entry['timestamp'],
                    appliance=entry['appliance'],
                    duration_hrs=entry['duration_hrs'],
                    room=entry['room'],
                    power_usage_kWh=entry['power_usage_kWh'],
                    estimated_cost=entry['estimated_cost'],
                    outside_temperature=entry['outside_temperature'],
                    day=entry['day'],
                    exceeds_threshold=entry['exceeds_threshold']
                )

                session.add(energy_entry)

        session.commit()
        return {"message": "Data generated and saved to database successfully."}
    except Exception as e:
        session.rollback()
        return {"error": f"An error occurred: {str(e)}"}
    finally:
        session.close()

@router.get("/generate-csv")
def generate_csv():
    filename = "mock_energy_data.csv"
    fieldnames = [
        "timestamp", "appliance", "duration_hrs", "room",
        "power_usage_kWh", "estimated_cost", "outside_temperature", "day", "exceeds_threshold"
    ]

    with open(filename, mode="w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        for _ in range(100):
            for _ in range(10):
                entry = generate_raw_entry()
                writer.writerow(entry)

    return {"message": f"{filename} generated successfully with 1000 records."}
