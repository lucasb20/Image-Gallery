from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from backend.database import db
import datetime as dt

class Image(db.Model):
    __tablename__ = 'Images'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    description: Mapped[Optional[str]]
    author: Mapped[str]
    signature: Mapped[str]
    created: Mapped[dt.datetime] = mapped_column(default=lambda: dt.datetime.now(dt.timezone.utc))

    def __repr__(self):
        return f'<Image {self.id}>'