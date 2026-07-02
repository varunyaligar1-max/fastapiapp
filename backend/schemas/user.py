from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_mode = True

class Login_User(BaseModel):
    email: str
    password: str