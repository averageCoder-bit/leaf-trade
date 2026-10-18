
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            # Local development
            "http://localhost:5173",
            "http://127.0.0.1:5173",

            # Cloudflare deployments
            "https://leaftrade.pages.dev",
            "https://leaf-trade.kyleeva53.workers.dev",

            # Custom production domain
            "https://leaftrade.com",
        ],
        allow_credentials=True,
        allow_methods=[
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],
        allow_headers=[
            "Authorization",
            "Content-Type",
        ],
    )
