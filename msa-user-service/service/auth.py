import bcrypt
from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserLogin, Token


# JWT 로그인 처리
def userlogin(login: UserLogin, db: Session):
    loginuser = db.query(User.userid, User.passwd)\
        .filter(User.userid == login.userid, User.passwd == login.passwd).first()

    print(loginuser)

    if loginuser is None:
        token = None
    else:
        # token = "{'access_token': 'Hello, world', 'token_type': 'bearer'}"
        token = Token(access_token='hello', token_type='bearer')

    return token

# 비밀번호 암호화
# bcrypt : 비밀번호 단방향 암호화에 자주 사용하는 패키지
# 암호화 방법 : 사용자의 비밀번호 + bcrypt의 고유한 솔트(SALT)
def hashed_password(passwd):
    # 솔트 생성 - 비밀번호 쓸때마다 서로 다른 salt생성해서 사용
    SALT = bcrypt.gensalt()  # salt 암호화에 더 추가해서 보안을 강화시키는거 - 단순한 문자에 추가 문자
    hashed_passwd = bcrypt.hashpw(passwd.encode('UTF-8'), SALT)
    print(hashed_passwd)

    return hashed_passwd
