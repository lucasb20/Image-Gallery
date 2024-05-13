
def test_fifty_images(client):
    for i in range(50):
        img = open("tests/example.jpeg", "rb")
        title = "lazy title" + str(i)
        author = "lucasb" + str(i)
        data = {
        "file": img,
        "title": title,
        "description": "Yumeko Jabami",
        "author": author,
        "signature": "something"
        }
        client.post("/images/", data=data)

def test_first_page(client):
    res = client.post("/images/page/")
    body = res.get_json()
    assert body['page'] == 1

def test_other_page(client):
    res = client.post("/images/page/", json={'page':2})
    body = res.get_json()
    assert body['page'] == 2

def test_search_text(client):
    data = {
        'text':'lazy title2'
    }
    res = client.post("/images/page/", json=data)
    assert res.status_code == 200