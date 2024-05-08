
from flask import Blueprint, request

bp = Blueprint("Images", "Images", __name__, url_prefix="/image")

@bp.route('/', methods=['GET', 'POST'])
def setImages():
    if request.method == 'GET':
        return 'Get all images'
    else:
        return 'Create new image'

@bp.route('/id', methods=['GET', 'PUT', 'DELETE'])
def setImageDetail():
    if request.method == 'GET':
        return 'Get image info'
    elif request.method == 'PUT':
        return 'Update image info'
    else:
        return 'Delete image info'