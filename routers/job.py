from fastapi import APIRouter
from schemas.job import jobCreate,jobeUpdate

router=APIRouter(prefix="/job",tags=["job"])
jobs=[]

@router.post("/")
def Create_job(job:jobCreate):
    jobs.append(job)
    return job

@router.get("/")
def get_all_Company():
    return jobs

@router.get("/{company_id}")
def get_comapny(company_id: int):
     return jobs[company_id]

@router.put("/{company_id}")
def update_company(company_id:int,job:jobCreate):
    jobs[company_id]=company
    return jobs

@router.delete("/{company_id}")
def delete_company(company_id:int):
    jobss.pop(company_id)
    return jobs







# @router.get("/")
# def read_comapny():
#     return{"job":"job root"}

# @router.get("/{job_id}")
# def read_job(job_id: int):
#     return{"job":"job_id"}