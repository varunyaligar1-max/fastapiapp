import os
import uuid
from dotenv import load_dotenv
from groq import Groq
from langchain_core.messages import AIMessage, HumanMessage

load_dotenv()

# Initialize client lazily to avoid errors if API key is not set
client = None

def get_client():
    global client
    if client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY environment variable is not set. Please set it in your .env file.")
        client = Groq(api_key=api_key)
    return client

chat_histories = {}

def get_session_history(session_id=None):
    if session_id is None:
        session_id = str(uuid.uuid4())
    if session_id not in chat_histories:
        chat_histories[session_id] = []
    return session_id, chat_histories[session_id]

def chat_with_memory(user_query: str, session_id: str | None = None) -> tuple[str, str]:
    session_id, history = get_session_history(session_id)

    history.append(HumanMessage(content=user_query))

    messages = []
    for msg in history:
        if isinstance(msg, HumanMessage):
            messages.append({"role": "user", "content": msg.content})
        elif isinstance(msg, AIMessage):
            messages.append({"role": "assistant", "content": msg.content})

    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.7,
        max_tokens=1024,
    )

    reply_text = response.choices[0].message.content
    history.append(AIMessage(content=reply_text))
    return session_id, reply_text