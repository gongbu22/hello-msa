from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schema.user import User, UserBase, UserList, Token, UserLogin
from service.auth import userlogin
from service.database import get_db
from service.user import register, userlist, userone

router = APIRouter()

@router.post('/user', response_model=User)
async def new_user(user: UserBase, db:Session=Depends(get_db)):
    print(user)

    return register(db, user)

@router.get('/users', response_model=list[UserList])
async def list_users(db:Session=Depends(get_db)):

    users = userlist(db)

    # 테이블 조회한 결과 객체를
    # UserList 형식의 배열로 재생성
    # pydantic형식(json)에서 orm 형식으로 변환
    # return [UserList.from_orm(u) for u in users]
    return [UserList.model_validate(u) for u in users]

@router.get('/user/{mno}', response_model=Optional[User])
async def user_one(mno: int, db:Session=Depends(get_db)):

    user = userone(db, mno)

    if user is None:
        raise HTTPException(404, 'User not found!!')

    # 테이블 조회한 결과 객체를
    # UserList 형식의 배열로 재생성
    # pydantic형식(json)에서 orm 형식으로 변환
    # return [UserList.from_orm(u) for u in users]
    return User.model_validate(user)

@router.post('/userlogin', response_model=Optional[Token])
async def user_login(login: UserLogin, db:Session=Depends(get_db)):

    token = userlogin(login, db)
    # print(token)

    if token is None:
        raise HTTPException(401, '로그인 실패! - 아이디나 비밀번호가 틀려요!')

    return token