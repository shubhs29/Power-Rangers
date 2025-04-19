from fastapi import APIRouter
from pydantic import BaseModel
from tips_generator import generate_funny_tip

LLMrouter = APIRouter(prefix="/llm", tags=["LLM"])

class WastageInput(BaseModel):
    device: str
    issue: str
    consumption: int

@LLMrouter.post("/funny-tip")
async def get_funny_tip(wastage: WastageInput):
    tip = generate_funny_tip(wastage.dict())
    return {"tip": tip}
