
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install Python dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application
COPY src/backend ./src/backend

# Copy Alembic configuration and migrations
COPY alembic.ini .
COPY alembic ./alembic

CMD ["sh", "-c", "exec uvicorn src.backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
