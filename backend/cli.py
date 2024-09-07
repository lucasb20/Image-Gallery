
import click
from flask.cli import with_appcontext
from pathlib import Path

@click.group()
def db():
    pass

@click.command()
@with_appcontext
def create_all():
    from database import db
    from models import Image

    Path('./uploads').mkdir(exist_ok=True)
    db.create_all()
    click.echo('Initialized the database')

db.add_command(create_all)
