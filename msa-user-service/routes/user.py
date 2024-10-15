from email.policy import default

from fastapi import APIRouter
from pydantic import BaseModel


class User(BaseModel):
    userid: str
    passwd: str
    name: str
    email: str
router = APIRouter()

@router.post('/user')
async def new_user(user: User):
    print(user)
    return {'msg': 'ok'}