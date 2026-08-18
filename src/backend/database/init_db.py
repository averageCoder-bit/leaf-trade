from backend.database.base import Base
from backend.database.database import engine

def init_db():
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully")

if __name__ == "__main__":
    init_db()
