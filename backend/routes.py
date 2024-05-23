
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from marshmallow.exceptions import ValidationError
from sqlalchemy import select, or_
from backend.database import db
from backend.models import Image
from backend.utils import allowed_file, InsertImage
from backend.schemas import ImageSchema
import json
from json.decoder import JSONDecodeError
import os

bp = Blueprint("Images", __name__, url_prefix="/images")

@bp.route('/', methods=['POST'])
def setImages():
    if 'file' not in request.files:
        return jsonify({'message':'No file part'}), 404
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message':'No selected file'}), 404
    try:
        form = ImageSchema().load(request.form.to_dict())
    except ValidationError as e:
        return jsonify(e.messages), 404
    if file and allowed_file(file.filename):
        filename = InsertImage(form, file)
        if not filename:
            return jsonify({'message':'Title already exists'}), 403
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message':'File sent sucessfully.'}), 201

@bp.route('/first/', methods=['GET'])
def getImage():
    args = request.args.to_dict()
    if 'id' not in args:
        return jsonify({'message':'Id not in query'}), 404
    query = select(Image).where(Image.id == args['id'])
    img = db.session.execute(query).scalar()
    return ImageSchema().dumps(img)

@bp.route('/page/', methods=['POST'])
def getPage():
    args = request.get_data()
    try:
        args = json.loads(args)
    except JSONDecodeError:
        args = {}
    query = select(Image)
    if 'text' in args:
        query = query.where(or_(Image.title.icontains(args['text']), Image.description.icontains(args['text']), Image.author.icontains(args['text'])))
    if 'ord_desc' in args:
        query = query.order_by(Image.created.desc())
    page = int(args['page']) if 'page' in args else 1
    res = db.paginate(query, page=page, max_per_page=20)
    items = ImageSchema(many=True).dumps(res.items)
    return jsonify({'page':page, 'pages':res.pages, 'items':items, 'total':res.total}), 200

@bp.route('/file/<name>', methods=['GET'])
def download_file(name):
    try:
        return send_from_directory(current_app.config["UPLOAD_FOLDER"], name)
    except:
        return jsonify({'message':'Image not found'}), 404