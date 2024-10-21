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

# 상품 삭제
def productdelete(db:Session, pno: int):
    # 삭제할 상품 조회
    product = db.query(Product).filter(Product.pno == pno).first()

    if product: # 삭제할 상품이 존재한다면
        db.delete(product)
        db.commit()
    else:
        return None

    # 삭제한 상품수를 직접 return 함
    # 만일, 프로그래밍으로 삭제한 상품수를 return 하려면
    # core orm을 이용할 것! (db.execute(delete~))
    return 1

# 상품 수정
def productupdate(db:Session, product: Product):
    # 삭제할 상품 조회
    productone = db.query(Product).filter(Product.pno == product.pno).first()

    # setattr(대상, 키, 값) : 실행 중에 특정 객체의 키를 기준으로 값을 수정함
    # 특정 객체의 속성들을 반복적으로 처리할 때 주로 사용
    if productone: # 삭제할 상품이 존재한다면
        # productone.name = product.name
        # productone.desc = product.desc
        # productone.price = product.price
        # productone.maker = product.maker
        # productone.regdate = product.regdate

        for key, val in product.__dict__.items():
            if key != 'pno' and val is not None:
                setattr(productone, key, val)
        db.commit()

    else:
        return None

    # 수정한 상품수를 직접 return 함
    return 1