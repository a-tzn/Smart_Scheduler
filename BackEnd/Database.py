from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL= "mysql+pymysql://root:admin@localhost:3306/schedule_db"

engine= create_engine(DATABASE_URL)

sessionLocal= sessionmaker(autocommit=False, autoflush=False, bind=engine)

db_connection= declarative_base()

#database.py
