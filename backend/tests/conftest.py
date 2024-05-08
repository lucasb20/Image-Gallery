import pytest
from backend.app import app as curr

@pytest.fixture()
def app():
    app = curr
    app.config.update({
        "TESTING": True,
    })

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()