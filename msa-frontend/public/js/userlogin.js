const loginbtn = document.querySelector('#loginbtn');
const loginfrm = document.loginfrm;

loginbtn.addEventListener('click', () => {
    const formData = new FormData(loginfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });

    const res = fetch('http://127.0.0.1:8000/userlogin',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsondata)
        })
        .then(res => {
            if (res.status === 401) {alert('회원 로그인 실패!!');}
            else if (res.status === 200) {alert('회원 로그인 성공!!');}
        }).catch((error) => {
            alert('회원 로그인 오류 발생!!');
        });

});