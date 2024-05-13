
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
    assert res.status_code == 200

def test_other_page(client):
    res = client.post("/images/page/?page=2")
    print(res.get_data())
    assert res.status_code == 200