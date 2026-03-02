from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from Database import engine, sessionLocal
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
import models

models.db_connection.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db= sessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/login/")
def login_user(user: UserLogin, db: Session= Depends(get_db)):
    old_user= db.query(models.accounts).filter(models.accounts.email == user.email).first()
    if not old_user or old_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}

@app.post("/create/")
def create_user(user: UserCreate, db: Session= Depends(get_db)):

    # Check if email already exists
    existing_email= db.query(models.accounts)\
        .filter(models.accounts.email== user.email)\
        .first()

    if existing_email:
        raise HTTPException(status_code= 400, detail= "Email already registered")

    # Check if username already exists
    existing_username= db.query(models.accounts)\
        .filter(models.accounts.username== user.username)\
        .first()

    if existing_username:
        raise HTTPException(status_code= 400, detail= "Username already taken")

    # Create new user
    new_user= models.accounts(
        username= user.username,
        email= user.email,
        password= user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Account created successfully"}

#main.py