
from flask import Blueprint

bp = Blueprint("Images", "Images", __name__, url_prefix="/image")

@bp.route('/', methods=['GET'])
def getImages():
    return 'Get all images'

@bp.route('/', methods=['POST'])
def postImage():
    return 'Create new image'

@bp.route('/id', methods=['GET'])
def getImage():
    return 'Get image info'

@bp.route('/id', methods=['PUT'])
def updateImage():
    return 'Update image info'

@bp.route('/id', methods=['DELETE'])
def deleteImage():
    return 'Delete image info'