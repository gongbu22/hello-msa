from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserBase


# 회원 가입 처리
# 기본 회원정보 + 번호, 가입일
def register(db: Session, user: UserBase):
    # 올바르게 넘어왔는지 확인 - 유효성 체크도 같이 함
    user = User(**user.model_dump())  # 데이터베이스에 넣어야해서 model의 User 가져옴
    db.add(user)
    db.commit()
    db.refresh(user) # 메모리 데이터 베이스에 반영하기
    print(user)

    return user