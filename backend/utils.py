from database import db
from models import Image
from sqlalchemy.exc import IntegrityError
from hashlib import sha256

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename : str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def InsertImage(form, file):
    extension = file.filename.rsplit('.', 1)[1].lower()
    s = sha256()
    s.update(form['signature'].encode("utf-8"))
    sign = s.hexdigest()
    img = Image(title=form['title'], description=form.get('description', None), author=form['author'], signature=sign, extension=extension)
    try:
        db.session.add(img)
        db.session.commit()
    except IntegrityError:
        return None
    return str(img.id) + '.' + extension