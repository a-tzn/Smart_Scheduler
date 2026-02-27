from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from Database import engine, sessionLocal
import models

models.db_connection.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Backend working!"}

@app.post("/Accounts/")
def create_user(username: str, email: str, password: str, db: Session = Depends(get_db)):
    new_user = models.User(username=username, email=email, password=password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user