from flask import Flask
from flask_cors import CORS
from routes import bp
from database import db
from cli import db as db_cli
import os

app = Flask(__name__)
app.instance_path = app.root_path
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY") or 'dev'
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

db.init_app(app)
CORS(app)

app.register_blueprint(bp)
app.cli.add_command(db_cli)