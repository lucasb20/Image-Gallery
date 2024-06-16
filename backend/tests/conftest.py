import pytest
from app import app as curr
from flask.testing import FlaskClient

@pytest.fixture()
def app():
    app = curr
    app.config.update({
        "TESTING": True,
    })

    yield app


@pytest.fixture()
def client(app):
    return FlaskClient(app)


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()