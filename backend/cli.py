
import click
from flask.cli import with_appcontext

@click.group()
def db():
    pass

@click.command()
@with_appcontext
def create_all():
    from backend.database import db
    from backend.models import Image

    db.create_all()
    click.echo('Initialized the database')

db.add_command(create_all)
