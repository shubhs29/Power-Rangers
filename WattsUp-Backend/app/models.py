from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class EnergyUsage(Base):
    __tablename__ = "energy_usage"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime)
    appliance = Column(String)
    duration_hrs = Column(Float)
    room = Column(String)
    power_usage_kWh = Column(Float)
    estimated_cost = Column(Float)
    outside_temperature = Column(Float)
    day = Column(String)
    exceeds_threshold = Column(Boolean)
    label = Column(String, nullable=True)



class ClusterInsights(Base):
    __tablename__ = "cluster_insights"

    id = Column(Integer, primary_key=True, index=True)
    appliance = Column(String)
    cluster_label = Column(Integer)
    avg_duration = Column(Float)
    avg_power_usage = Column(Float)
    avg_temperature = Column(Float)
    avg_hour = Column(Float)
    usage_pattern = Column(String)
