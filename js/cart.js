let cart = JSON.parse(localStorage.getItem('cart'));
let listProduct = document.querySelector('.list-product');

window.choiceCake = (e) => {
	e.classList.toggle('choice');
	let total = document.getElementById('total');
	let price = e.querySelector('.total p');
	if (e.classList.contains('choice')) {
		total.innerHTML = Intl.NumberFormat().format(
			parseInt(total.innerHTML.replaceAll(',', '')) +
				parseInt(price.innerHTML.replaceAll(',', ''))
		);
	} else {
		total.innerHTML = Intl.NumberFormat().format(
			parseInt(total.innerHTML.replaceAll(',', '')) -
				parseInt(price.innerHTML.replaceAll(',', ''))
		);
	}
};
window.removeCake = (e) => {
	let id = e.parentElement.id;
	cart = cart.filter((product) => product.cake !== id);
	localStorage.setItem('cart', JSON.stringify(cart));
	location.reload();
};

let renderProduct = (product) => {
	if (listProduct)
		listProduct.innerHTML += `
        <div class="product" id=${product.cake} onclick="choiceCake(this)">
            <div class="image">
                <img src=${product.image} alt="">
            </div>
            <div class="info">
                <h2 class="name">${product.title}</h2>
                <p class="price">
                    GIá: 
                    <span> ${product.price} VND</span>
                </p>
                <p class="amount">
                    Số lượng: 
                    <span> ${product.amount}</span>
                </p>
            </div>
            <div class="total">
                <p>${Intl.NumberFormat().format(
					parseInt(product.price.replace(/,/g, '')) *
						parseInt(product.amount)
				)} VND</p>
            </div>
            <div class="remove" onclick="removeCake(this)">X</div>
        </div>
    `;
};

cart.forEach((product) => renderProduct(product));

let buyBtn = document.querySelector('#buyBtn');
buyBtn.onclick = () => {
	let items = document.querySelectorAll('.product.choice');
	let data = [];
	items.forEach((item) => {
		let i = cart.findIndex((n) => n.cake === item.id);
		data.push({
			product: cart[i],
			amount: item.querySelector('.amount span').innerHTML,
		});
	});
	sessionStorage.setItem('cart', JSON.stringify(data));
	if (data.length !== 0) {
		let paths = location.pathname.split('/');
		let path = paths[paths.length - 1];
		location.pathname = location.pathname.replaceAll(path, 'payment.html');
	} else {
		alert('Bạn chưa chọn sản phẩm');
	}
};
