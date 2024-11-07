// 페이지 로드시 자동으로 실행
window.addEventListener('load', async () => {
    try {
        const users = await getUserList();
        displayUserList(users);
    } catch (e) {
        console.log(e);
        alert('회원 목록 조회 실패!');
    }
})

// 회원 데이터 가져오기
const getUserList = async () => {
    // 데이터를 가져오기만 하는거라서 그냥 url만 땡겨오면 된다.
    let url = `http://${sessionStorage.getItem('usersrvURL')}/users`
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
          throw new Error('회원 목록 조회 실패!!');
    }
};

// 가져온 회원 데이터 표시하기
const displayUserList = (users) => {
    const userlist = document.querySelector('#user-list');
    console.log(users);

    let html = '<ul>';
    for (const user of users) {
        html += `<li>
            회원 번호: ${user.mno},
            회원 아이디: <a href="/user/${user.mno}">${user.userid}</a>,
            회원 이름: ${user.name},
            회원 가입일: ${user.regdate}
         </li>`;
    }
    html += '</ul>';

    userlist.innerHTML = html;
};