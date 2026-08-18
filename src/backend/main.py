from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI

from middleware import setup_middleware
from routes.users import router as users_router

app = FastAPI()

setup_middleware(app)

app.include_router(users_router)