from flask import Flask
from backend.routes import bp
from backend.database import db
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY") or 'dev'
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

db.init_app(app)

app.register_blueprint(bp)