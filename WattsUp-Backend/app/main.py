from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
from routes import router
from dataframe import data
from dashboard import dashboard
from kpi import kpi     
from apply_label import label_router
from models import Base
from db import engine
from middleware import middleware_router 
from llm_routes import LLMrouter
from energy_insights import insightRouter
import os
from fastapi.middleware.cors import CORSMiddleware

    


# BASE_DIR = os.path.abspath(os.path.dirname(__file__))


app = FastAPI()

#CORS SETUP
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
# templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

Base.metadata.create_all(bind=engine)

# app.include_router(router)
# app.include_router(data)
# app.include_router(label_router)
app.include_router(dashboard)
# app.include_router(kpi)
app.include_router(middleware_router)
app.include_router(LLMrouter)
app.include_router(insightRouter)