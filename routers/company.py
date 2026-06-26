from fastapi import APIRouter

router=APIRouter(prefix="/company",tags=["company"])

@router.get("/")
def read_comapny():
    return{"company":"company root"}

@router.get("/{company_id}")
def read_comapny(comapny_id: int):
    return{"company":"company_id"}