from sqlalchemy import Column,Integer,String,Enum,ForeignKey,relationship
from database import Base,engine,sessionLocal

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, index=True)
    jobs = relationship("Job", back_populates="company")
    job_id = Column(Integer, ForeignKey("jobs.id"))