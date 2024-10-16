window.addEventListener('load', async() => {
    try {
        const products = await getProdList();
        // const products = null;  // 테스트용
        displayProdList(products);
    } catch (e) {
        console.log(e);
        alert('상품 목록 조회 실패!');
    }
})

const getProdList = async () => {
    let url = 'http://127.0.0.1:8050/products'
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error('상품 목록 fetch 실패!!');
    }
};

const displayProdList = (products) => {
    // products = [{'name':'테스트', 'price':99999, 'regdate':'2024-10-16'}]; // 테스트용

    const productlist = document.querySelector('#product-list');
    console.log(products);

    let html = '<ul>';
    for (const product of products) {
        html += `<li>
            상품 번호: ${product.pno},
            상품명: <a href="/product/${product.pno}">${product.name}</a>,
            상품가격: ${product.price},
            상품 등록일: ${product.regdate}
        </li>`;
    }
    html += '</ul>';

    productlist.innerHTML = html;
}