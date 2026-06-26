from pydantic import BaseModel
from typing import Optional

class jobCreate(BaseModel):
    title:str
    salary:int

class jobeUpdate(BaseModel):
    title: Optional[str] =None
    salary: Optional[str]=None
