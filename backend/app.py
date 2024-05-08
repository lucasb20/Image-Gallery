from flask import Flask
from backend.routes import bp
import os

UPLOAD_FOLDER = '/uploads'

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY") or 'dev'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

app.register_blueprint(bp)