
from flask import Blueprint, request, jsonify, current_app, redirect, url_for, send_from_directory
from backend.utils import allowed_file
from werkzeug.utils import secure_filename
import os

bp = Blueprint("Images", __name__, url_prefix="/image")

@bp.route('/', methods=['GET', 'POST'])
def setImages():
    if request.method == 'GET':
        return 'Get all images'
    else:
        if 'file' not in request.files:
            return jsonify({'message':'No file part'}), 404
        file = request.files['file']
        if file.filename == '':
            return jsonify({'message':'No selected file'}), 404
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('Images.setImageDetail', id=filename))

@bp.route('/<id>', methods=['GET', 'PUT', 'DELETE'])
def setImageDetail(id):
    if request.method == 'GET':
        try:
            return send_from_directory(current_app.config["UPLOAD_FOLDER"], id)
        except:
            return jsonify({'message':'Image not found'}), 404
    elif request.method == 'PUT':
        return 'Update image info'
    else:
        return 'Delete image info'