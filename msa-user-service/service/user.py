from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserBase
from service.auth import hashed_password


# 회원 가입 처리
# 기본 회원정보 + 번호, 가입일
def register(db: Session, user: UserBase):

    # 비밀번호 암호화
    hashed_passwd = hashed_password(user.passwd)

    # 올바르게 넘어왔는지 확인 - 유효성 체크도 같이 함
    # json데이터를 pydantic모델로 변환하는 과정 **user
    user = User(**user.model_dump())  # 데이터베이스에 넣어야해서 model의 User 가져옴
    user.passwd = hashed_passwd # 기존 비밀번호 교체
    db.add(user)
    db.commit()
    db.refresh(user) # 메모리 데이터 베이스에 반영하기
    print(user)

    return user

# 회원 목록 조회
def userlist(db: Session):
    return db.query(User.mno, User.userid, User.name, User.regdate).all()

# 회원 상세 조회
def userone(db: Session, mno: int):
    return db.query(User).filter(User.mno == mno).first()