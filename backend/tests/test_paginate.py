
def test_fifty(client):
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