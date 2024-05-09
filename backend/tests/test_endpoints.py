
def test_no_exists(client):
    res = client.get("/noexists")
    assert res.status_code == 404

def test_post_image(client):
    img = open("tests/example.jpg", "rb")

    res = client.post("/image/?title=test&author=lucasb20&signature=something", data={"file": img})
    assert res.status_code == 302

def test_get_image(client):
    res = client.get("/image/image0.jpg")
    assert res.status_code == 200