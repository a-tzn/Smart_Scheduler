from sqlalchemy import Column, Integer, String
from Database import db_connection

class Accounts(db_connection):
    __tablename__ = "Accounts"

    id= Column(Integer, primary_key= True, index= True)
    username = Column(String(50))
    email = Column(String(50))
    password = Column(String(100))
