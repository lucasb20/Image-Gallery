from marshmallow import Schema, fields, validate

class ImageSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True, validate=validate.Length(max=256))
    description = fields.String(allow_none=True)
    author = fields.String(required=True, validate=validate.Length(max=256))
    signature = fields.String(required=True, validate=validate.Length(max=256))
    created = fields.DateTime(dump_only=True)
