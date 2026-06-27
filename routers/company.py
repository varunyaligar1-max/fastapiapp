from fastapi import APIRouter
from schemas.company import CompanyCreate,CompanyUpdate

router=APIRouter(prefix="/company",tags=["company"])
companies=[]

@router.post("/")
def Create_Company(company:CompanyCreate):
    companies.append(company)
    return company

@router.get("/")
def get_all_Company():
    return companies

@router.get("/{company_id}")
def get_comapny(company_id: int):
     return companies[company_id]

@router.put("/{company_id}")
def update_company(company_id:int,company:CompanyUpdate):
    companies[company_id]=company
    return companies

@router.delete("/{company_id}")
def delete_company(company_id:int):
    companies.pop(company_id)
    return companies


# @router.get("/")
# def read_comapny():
#     return{"company":"company root"}

# @router.get("/{company_id}")
# def read_comapny(comapny_id: int):
#     return{"company":"company_id"}