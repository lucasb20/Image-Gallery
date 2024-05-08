import sqlite3
from flask import current_app, g

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(current_app.config['DATABASE'])
    return db

@current_app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with current_app.app_context():
        db = get_db()
        with current_app.open_resource('init.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()