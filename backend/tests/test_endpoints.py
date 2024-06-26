
def test_no_exists(client):
    res = client.get("/noexists")
    assert res.status_code == 404

def test_post_image(client):
    img = open("tests/example.jpg", "rb")
    data = {
        "file": img,
        "title": "some title",
        "description": "some description",
        "author": "lucasb20",
        "signature": "something"
    }
    res = client.post("/images/", data=data)
    assert res.status_code == 201

def test_get_image(client):
    res = client.get("/images/file/1.jpg")
    assert res.status_code == 200

def test_search_image(client):
    res = client.post("/images/page/", json={"text":"example"})
    print(res.data)
    assert res.status_code == 200

def test_get_first(client):
    res = client.get("/images/first/?id=1")
    assert res.status_code == 200