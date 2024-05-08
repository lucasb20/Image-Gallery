
def test_get_detail(client):
    res = client.get("/noexists")
    assert res.status_code == 404