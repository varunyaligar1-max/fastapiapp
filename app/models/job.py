from sqlalchemy import Column, Integer, String, ForeignKey,relationship,Enum
from models.company import company
from database import Base, engine, sessionLocal


class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"),nullable=False)
    salary = Column(String, nullable=False)
    company = relationship("Company", back_populates="jobs")
