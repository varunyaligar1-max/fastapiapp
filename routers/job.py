from fastapi import APIRouter
from schemas.job import JobCreate,JobUpdate

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

@router.put("/{job_id}")
def update_job(job_id:int,job:JobUpdate):
    jobs[job_id]=job
    return jobs

@router.delete("/{job_id}")
def delete_job(job_id:int):
    jobs.pop(job_id)
    return jobs







# @router.get("/")
# def read_comapny():
#     return{"job":"job root"}

# @router.get("/{job_id}")
# def read_job(job_id: int):
#     return{"job":"job_id"}