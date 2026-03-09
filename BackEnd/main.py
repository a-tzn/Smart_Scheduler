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

class TaskCreate(BaseModel):
    title: str
    objective: str
    startDate: str
    endDate: str
    priority: str
    status: str

class TaskUpdate(BaseModel):
    title: str
    objective: str
    startDate: str
    endDate: str
    priority: str
    status: str

class TaskDelete(BaseModel):
    id: int

@app.post("/login/")
def login_user(user: UserLogin, db: Session= Depends(get_db)):
    old_user= db.query(models.Accounts).filter(
        models.Accounts.email == user.email).first()
    if not old_user or old_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access": True,
            "token": "logintoken",
            "account_id": old_user.id}

@app.post("/create/")
def create_user(user: UserCreate, db: Session= Depends(get_db)):

    existing_email= db.query(models.Accounts)\
        .filter(models.Accounts.email== user.email)\
        .first()

    if existing_email:
        raise HTTPException(status_code= 400, detail= "Email already registered")

    existing_username= db.query(models.Accounts)\
        .filter(models.Accounts.username== user.username)\
        .first()

    if existing_username:
        raise HTTPException(status_code= 400, detail= "Username already taken")

    new_user= models.Accounts(
        username= user.username,
        email= user.email,
        password= user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Account created successfully"}

@app.post("/create_task/{account_id}")
def create_task(account_id: int, task: TaskCreate, db: Session= Depends(get_db)):
    account= db.query(models.Accounts).filter(models.Accounts.id== account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    new_task = models.Tasks(
        title=task.title,
        objective=task.objective,
        startDate=task.startDate,
        endDate=task.endDate,
        priority=task.priority,
        status=task.status,
        account_id=account_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {"message": "Task created successfully"}

@app.put("/update_task/{task_id}")
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):

    db_task = db.query(models.Tasks).filter(
        models.Tasks.id == task_id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task.title
    db_task.objective = task.objective
    db_task.startDate = task.startDate
    db_task.endDate = task.endDate
    db_task.priority = task.priority
    db_task.status = task.status

    db.commit()
    db.refresh(db_task)

    return {"message": "Task updated"}

@app.get("/tasks/{account_id}")
def get_tasks(account_id: int, db: Session = Depends(get_db)):

    tasks = db.query(models.Tasks).filter(
        models.Tasks.account_id == account_id
    ).all()

    return tasks

@app.delete("/delete_task/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):

    db_task = db.query(models.Tasks).filter(
        models.Tasks.id == task_id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()

    return {"message": "Task deleted"}

#main.py