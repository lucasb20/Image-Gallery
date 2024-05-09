from backend.database import db
from backend.models import Image
from sqlalchemy.exc import IntegrityError

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename : str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def InsertImage(title, description, author, signature):
    img = Image(title=title, description=description, author=author, signature=signature)
    try:
        db.session.add(img)
        db.session.commit()
    except IntegrityError:
        return None
    return img