from flask import Flask
from backend.routes import bp
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY") or 'dev'
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

app.register_blueprint(bp)