from backend.database import db
from backend.models import Image
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename : str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def InsertImage(title, description, author, signature, file):
    extension = file.filename.rsplit('.', 1)[1].lower()
    img = Image(title=title, description=description, author=author, signature=signature, extension=extension)
    try:
        db.session.add(img)
        db.session.commit()
    except IntegrityError:
        raise IntegrityError
    return secure_filename(title) + '.' + extension