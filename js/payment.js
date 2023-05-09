import { username } from './auth.js';
import products from '../data/products.json' assert { type: 'json' };
let orderDetails = JSON.parse(sessionStorage.getItem('cart'));
let form = document.querySelector('form');

let data = {
	user: username,
	address: null,
	orderDetails: orderDetails.map((orderDetail) => ({
		product: orderDetail.product.cake,
		amount: orderDetail.amount,
	})),
};
let total = orderDetails.reduce((initial, orderDetail, index) => {
	return (
		initial +
		parseInt(orderDetail.product.price.replaceAll(',', '')) *
			parseInt(orderDetail.amount)
	);
}, 0);

if (form) {
	form.innerHTML = '';
	form.innerHTML += `
		<h2>Chi tiết hóa đơn</h2>
		<div class="input-group">
			<label for="username">Tài khoản :</label>
			<input type="text" placeholder="${
				data.user
			}" id="username" name="username" disabled>
		</div>
		<div class="input-group">
			<label for="address">Địa chỉ :</label>
			<input type="text" placeholder="vui lòng nhập địa chỉ" id="address" required>
		</div>
		<div class="list-product">
			<div class="product">
				<img src="../images/wallpaper/backgroudHome.jpg" alt="">
				<div class="info">
					<p class="amount">2</p>
					<p class="price">100,000 vnd</p>
				</div>
			</div>
		</div>
		<div class="text-group">
			<p>Tổng tiền : </p>
			<span>${Intl.NumberFormat().format(total)} VND</span>
		</div>
		<div class="text-group">
			<p>Tiền ship : </p>
			<span>${Intl.NumberFormat().format(30000)} VND</span>
		</div>

		<hr>
		<div class="text-group">
			<p>Hóa đơn : </p>
			<span>${Intl.NumberFormat().format(total + 30000)} VND</span>
		</div>
		<div class="button-group">
			<button>Xác nhận mua hàng</button>
		</div>
	`;
}

let elementsOrderDetail = document.querySelector('.list-product');
if (elementsOrderDetail) {
	elementsOrderDetail.innerHTML = '';
	let html = orderDetails.map(
		(orderDetail) =>
			`
			<div class="product">
				<img src=${orderDetail.product.image} alt="">
				<div class="info">
					<p class="amount">${orderDetail.amount}</p>
					<p class="price">${orderDetail.product.price} vnd</p>
				</div>
			</div>
		`
	);
	elementsOrderDetail.innerHTML = html.join('');
}
form.onsubmit = async (e) => {
	e.preventDefault();

	alert('Mua hành thành công. Hãy tiếp tục mua hàng nhé !!!');
	orderDetails.forEach((orderDetail) => {
		let id = orderDetail.product.cake;
		let cartLocal = JSON.parse(localStorage.getItem('cart'));
		cartLocal = cartLocal.filter((product) => product.cake !== id);
		localStorage.setItem('cart', JSON.stringify(cartLocal));
	});
	let paths = location.pathname.split('/');
	let path = paths[paths.length - 1];
	location.pathname = location.pathname.replace(path, 'index.html');
};
