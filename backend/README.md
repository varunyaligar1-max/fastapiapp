# fastapiapp

##creating fastapi application

## Fastapiapp

## creating fastapi application


## crud operations
-create
-read
-update
-delete


## Rest API

-Get
-Post
-Put
-Del


## Architecture of FastAPI application
--Model  
--Router  
--Controller  
--Service  
--Repositor  
--Middleware  
--Schem  

## models
alembic ---- database migration



# concepts
# Concepts:

pip install alembic

alembic init alembic

alembic -> env.py -> from imported model -> metadata data

alembic.ini -> sqlalchemy.url = postgres url
--> postgresql://user:password@host:port/database_name

alembic revision --autogenerate -m "initial migration"

alembic upgrade head




# Before Deployment checklist
Denv configured
on startup create all tables in db
async await in every api and function and session handling for all apis
exception handling for all apis ->
eg:
1. resource not found
2.internal server error
3. bad request
4. unauthorized
5. forbidden
6.validation error
7.email already exists
8. password incorrect
9.company not found