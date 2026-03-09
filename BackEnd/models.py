from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from Database import db_connection

class Accounts(db_connection):
    __tablename__= "Accounts"

    id= Column(Integer, primary_key= True, index= True)
    username= Column(String(50), unique= True)
    email= Column(String(50), unique= True)
    password= Column(String(100))

    tasks= relationship("Tasks", back_populates="owner")

class Tasks(db_connection):
    __tablename__= "Tasks"

    id= Column(Integer, primary_key= True, index= True)
    title= Column(String(100))
    objective= Column(String(255))
    startDate= Column(String(20))
    endDate= Column(String(20))
    priority= Column(String(20))
    status= Column(String(20))
    account_id= Column(Integer, ForeignKey("Accounts.id"))

    owner= relationship("Accounts", back_populates="tasks")

#models.py