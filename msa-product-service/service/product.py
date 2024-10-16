from sqlalchemy.orm import Session

from models.product import Product
from schema.product import ProductBase


def register(db:Session, product:ProductBase):
    product = Product(**product.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    print(product)

    return product

# 상품 목록 조회
def productlist(db: Session):
    return db.query(Product.pno, Product.name, Product.price, Product.regdate)\
        .order_by(Product.pno.desc()).all()

# 상품 상세 조회
def productone(db:Session, pno: int):
    return db.query(Product).filter(Product.pno == pno).first()