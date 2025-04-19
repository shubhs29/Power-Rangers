from sqlalchemy import inspect
from models import EnergyUsage
from db import SessionLocal
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Query
import pandas as pd

data = APIRouter()

@data.get("/dataframe")
def fetch_data(only_exceeds: bool = Query(False, description="Return only rows where exceeds_threshold=True")):
    session = SessionLocal()
    try:
        mapper = inspect(EnergyUsage)
        columns = [column.key for column in mapper.attrs]
        query = session.query(EnergyUsage)

        if only_exceeds:
            query = query.filter(EnergyUsage.exceeds_threshold == True)

        results = query.all()

        output = [{col: getattr(row, col) for col in columns} for row in results]
        df = pd.DataFrame(output)

        if not df.empty:
            df["timestamp"] = df["timestamp"].astype(str)  # Ensure timestamp is JSON serializable

        return JSONResponse(content=df.to_dict(orient="records"))
    except Exception as e:
        print(f"Error fetching data: {e}")
        return JSONResponse(content={"error": "Failed to fetch data."})
    finally:
        session.close()
