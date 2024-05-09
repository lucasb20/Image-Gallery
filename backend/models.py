from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from backend.database import db
import datetime as dt

class Image(db.Model):
    __tablename__ = 'Images'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str]
    author: Mapped[str]
    signature: Mapped[str]
    created_at: Mapped[dt.datetime]

    def __repr__(self):
        return f'<Image {self.id!r}>'