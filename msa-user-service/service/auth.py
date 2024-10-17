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