from fastapi import APIRouter,HTTPException
from pydantic import BaseModel

from services.langchain_service import chat_with_memory

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    session_id, reply = chat_with_memory(
        user_query=request.message,
        session_id=request.session_id
    )

    return ChatResponse(response=reply)