from fastapi import APIRouter

router=APIRouter(prefix="/job",tags=["job"])

@router.get("/")
def read_comapny():
    return{"job":"job root"}

@router.get("/{job_id}")
def read_job(job_id: int):
    return{"job":"job_id"}