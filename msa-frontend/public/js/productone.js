document.addEventListener('DOMContentLoaded', async () => {

    let pno = location.pathname.split('/').pop();

    try {
        const product = await getProductOne(pno);
        displayProductOne(product);
    } catch (e) {
        console.log(e);
        alert('상품 상세 정보 조회 실패!');
    }
});

const getProductOne = async (pno) => {
    let url = `http://${sessionStorage.getItem('productsrvURL')}:8050/product/${pno}`;
    const res = await fetch(url);
    if (res.status === 404) {
        location.href = '/notfound';
    } else if (res.ok) { // res.status === 200 과 동일
        data = await res.json();
        return data;
    } else {
        throw new Error('상품 상세 정보 fetch 오류 발생!!');
    }
}

const displayProductOne = (product) => {
    const productone = document.querySelector('#projectone');
    console.log(product);

    let html = '<ul>';
        html += `<li>
            상품 번호: ${product.pno},
            상품명: ${product.name},
            상품 설명: ${product.desc},
            상품 가격: ${product.price},
            제조사: ${product.maker},
            상품 등록일: ${product.regdate}
        </li>`;

    html += '</ul>';

    productone.innerHTML = html;
}