
from flask import Blueprint, request, jsonify, current_app, redirect, url_for, send_from_directory
from marshmallow.exceptions import ValidationError
from sqlalchemy import select
from backend.database import db
from backend.models import Image
from backend.utils import allowed_file, InsertImage
from backend.schemas import ImageSchema
import os

bp = Blueprint("Images", __name__, url_prefix="/images")

@bp.route('/', methods=['GET', 'POST'])
def setImages():
    if request.method == 'GET':
        args = request.args.to_dict()
        query = select(Image)
        if 'id' in args:
            query = query.where(Image.id == int(args['id']))
        if 'author' in args:
            query = query.where(Image.author == args['author'])
        if 'signature' in args:
            query = query.where(Image.signature == args['signature'])
        res = db.session.execute(query).all()
        return ImageSchema(many=True).dumps(res)
    else:
        try:
            cont = ImageSchema().load(request.args.to_dict())
        except ValidationError as e:
            return jsonify(e.messages), 404
        if 'file' not in request.files:
            return jsonify({'message':'No file part'}), 404
        file = request.files['file']
        if file.filename == '':
            return jsonify({'message':'No selected file'}), 404
        if file and allowed_file(file.filename):
            description = cont['description'] if 'description' in cont else None
            filename = InsertImage(cont['title'], description, cont['author'], cont['signature'], file)
            if not filename:
                return jsonify({'message':'Title already exists'}), 403
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('Images.setImageDetail', id=filename))

@bp.route('/<name>', methods=['GET'])
def download_file(name):
    try:
        return send_from_directory(current_app.config["UPLOAD_FOLDER"], name)
    except:
        return jsonify({'message':'Image not found'}), 404