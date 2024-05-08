from flask import Flask
from routes import bp
import os

UPLOAD_FOLDER = '/uploads'

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY") or 'dev'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_blueprint(bp)