from datetime import datetime
from email.policy import default

from fastapi import APIRouter
from pydantic import BaseModel


class Product(BaseModel):
    name: str
    desc: str
    price: int
    maker: str
    regdate: datetime
router = APIRouter()

@router.post('/product')
async def new_product(product: Product):
    print(product)
    return {'msg': 'ok'}