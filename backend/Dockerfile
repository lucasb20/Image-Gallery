FROM python:3-slim

WORKDIR /usr/src/backend

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 80

CMD flask db create-all && \
    gunicorn --preload -w 4 -b 0.0.0.0:80 app:app