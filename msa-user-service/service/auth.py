from datetime import timedelta, datetime
from typing import Optional

import bcrypt
import jwt  # 설치할 때 PyJWT
from sqlalchemy.orm import Session

from models.user import User
from schema.user import UserLogin, Token


# JWT 로그인 처리
def userlogin(login: UserLogin, db: Session):
    loginuser = db.query(User)\
        .filter(User.userid == login.userid).first()

    if loginuser is None:  # 아이디가 일치하지 않으면
        token = None
    elif not bcrypt.checkpw(login.passwd.encode('UTF-8'), loginuser.passwd):  # 비밀번호가 일치하지 않으면
        token = None
    else:
        # token = "{'access_token': 'Hello, world', 'token_type': 'bearer'}"
        # token = Token(access_token='hello', token_type='bearer')
        access_token = generate_access_token(login.userid)
        token = Token(access_token=access_token, token_type='bearer')

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

# JWT 액세스 토큰 생성 (jwt.io)
# 액세스 토큰  = 헤더 + 페이로드 + 시그니처
# 페이로드 : JWT의 중요한 구성요소 - 토큰에 저장한 사용자 정보 및 클레임 포함
# 등록된 클레임 : iss(발급주체), sub(토큰주제), aud(토큰사용가능대상-url),
#              exp(유효기간), iat(발생시간), jti(토큰 고유식별자)
# pip uninstall jwt
# pip install PyJWT
# expire_delta : 토큰 유지 기간 (기본 30분)
def generate_access_token(userid: str, expire_delta: Optional[timedelta] = None):

    # 토큰 생성시 사용할 비밀키
    SECRETKEY = 'Hello, World!! 13579'

    # 토큰 유효기간 설정
    if expire_delta:
        expire = datetime.now() + expire_delta
    else:
        expire = datetime.now() + timedelta(minutes=30)

    # 토큰 발급
    to_encode = {'iss':'http://127.0.0.1:3000', 'sub': userid,
                 'exp': expire, 'aud':'http://127.0.0.1:3000'} # jwt 페이로드
    encoded_jwt = jwt.encode(to_encode, SECRETKEY, algorithm='HS256')

    return encoded_jwt
