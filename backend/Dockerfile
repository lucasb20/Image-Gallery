FROM python:3-slim

WORKDIR /usr/src/backend

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD flask db create-all && \
    flask run --host=0.0.0.0