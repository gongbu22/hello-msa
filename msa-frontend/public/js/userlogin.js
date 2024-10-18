const loginbtn = document.querySelector('#loginbtn');
const loginfrm = document.loginfrm;
const naver = document.querySelector('#naver');

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
        }).then(res => {
            if (res.status === 401) {
                alert('회원 로그인 실패!!');
            } else if (res.status === 200) {
                return res.json();  // 밑에 data
            }
        }).then(data => {
            if (data) {
                // console.log(data.access_token); // 토큰 확인
                // javascript 내에 저장소가 있음 localStorage
                // localStorage.setItem('token', data.access_token); // 토큰 저장
                sessionStorage.setItem('token', data.access_token);
                alert('회원 로그인 성공!!');
            } else {
                alert('로그인 토큰 확인 불가!!');
            }
        }).catch((error) => {
            alert('회원 로그인 오류 발생!!');
        });

});

// 네이버 로그인 버튼 표시
// 즉시 실행 함수 : 일반적인 함수 실행은 함수 정의 후 호출시 이루어 짐
// 하지만, 즉시 실행 함수는 함수 정의 후 호출 없이 바로 함수를 실행하게 함
// (함수명() { 함수몸체 })(), (() => { 함수몸체 })()
( () => {
    // naver.innerHTML = "<p>Hello, World!!</p>";

    fetch('http://127.0.0.1:3000/api/naver2')
        .then(res => {
        if (res.status === 200) {
            return res.text();  // 밑에 data
        }
    }).then(data => {
        naver.innerHTML = data;
    })
})();