
from flask import Blueprint, request, jsonify, current_app, redirect, url_for, send_from_directory
from marshmallow.exceptions import ValidationError
from sqlalchemy import select
from backend.database import db
from backend.models import Image
from backend.utils import allowed_file, InsertImage
from backend.schemas import ImageSchema
import json
from json.decoder import JSONDecodeError
import os

bp = Blueprint("Images", __name__, url_prefix="/images")

@bp.route('/', methods=['GET', 'POST'])
def setImages():
    if request.method == 'GET':
        args = request.get_data()
        try:
            args = json.loads(args)
        except JSONDecodeError:
            args = {}
        query = select(Image)
        if 'id' in args:
            query = query.where(Image.id == args['id'])
        if 'title' in args:
            query = query.where(Image.title.icontains(args['title']))
        if 'description' in args:
            query = query.where(Image.description.icontains(args['description']))
        if 'author' in args:
            query = query.where(Image.author.icontains(args['author']))
        if 'signature' in args:
            query = query.where(Image.signature.icontains(args['signature']))
        if 'ord_desc' in args:
            query = query.order_by(Image.created.desc())
        rows = db.session.execute(query).scalars().all()
        return ImageSchema(many=True).dumps(rows)
    else:
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
    img = Image.query.where(Image.id == args["id"]).first()
    return ImageSchema().dumps(img)

@bp.route('/file/<name>', methods=['GET'])
def download_file(name):
    try:
        return send_from_directory(current_app.config["UPLOAD_FOLDER"], name)
    except:
        return jsonify({'message':'Image not found'}), 404