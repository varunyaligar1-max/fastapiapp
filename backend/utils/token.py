from jose import jwt
from datetime import datetime, timedelta
from schemas.token import Token
from dotenv import load_dotenv
import os   
from models.user import User
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
load_dotenv()
SECRET_KEY=os.get_env("SECRET_KEY")
ALGORITHM=os.get_env("ALGORITHM")

def create_access_token(data: dict, expires_delta: timedelta =timedelta(hours=2) ):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return Token(token=encoded_jwt, token_type="bearer")
def verify_access_token(token:str,db: Session=Depends(get_db)):
        to_decode = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        current_user = db.query(User).filter(User.id == to_decode["user_id"]).first()
        if current_user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return current_user