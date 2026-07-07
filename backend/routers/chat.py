from fastapi import APIRouter
from pydantic import BaseModel

from services.langchain_service import ask_career_chatbot_response

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/ask_career", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):

    reply = ask_career_chatbot_response(
        question=request.message,
        session_id=request.session_id
    )

    return ChatResponse(response=reply)