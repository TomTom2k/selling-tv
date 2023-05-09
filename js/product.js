import { cart } from './auth.js';
import products from '../data/products.json' assert { type: 'json' };
import tags from '../data/tags.json' assert { type: 'json' };

let id = sessionStorage.getItem('id')
	? JSON.parse(sessionStorage.getItem('id'))
	: 1;

let renderMain = () => {
	// get product active when filter
	let data = products.filter((product) => product.id === id)[0];
	let main = document.querySelector('main');
	main.innerHTML = `
	<section class="info-cake container">
            <div class="l-info">
                <img src=${data.image} alt="">
            </div>
            <div class="r-info" id=${data.id}>
                <h4 class="name">${data.title}</h4>
                <h2 id="price">
                    <p class="old">240000</p>
                    <p class="new">120000</p>
                </h2>
                <p id="category">
					${tags[data.category].name}
                </p>
                <div class="input-group">
                    <label for="amount">Số lượng</label>
                    <input name="amount" id="amount" type="number" min="0" class="amount" placeholder="1" value="1">
                </div>
                <div class="button-group">
                    <button id="addCard" class="btn-primary" onclick="handlerBtnAdd(this)">Thêm vào giỏ hàng</button>
                    <button id="buy">Mua ngay</button>
                </div>
            </div>
        </section>
        <section class="more-info-cake container">
            <div class="describe">
                <b>Miêu tả: </b>
                <span>${data.description}</span>
            </div>
        </section>
	`;
	// add sale price
	document.getElementById('price').innerHTML = `
		<h2 id="price">
			<p class="new">${Intl.NumberFormat().format(data.price)}</p>
		</h2>
	`;
};

renderMain();

window.handlerBtnAdd = (e) => {
	let section = e.parentElement.parentElement;
	let item = {
		cake: section.id,
		title: section.querySelector('.name').innerHTML,
		image: section.parentElement.querySelector('img').src,
		price: section.querySelector('#price .new').innerHTML,
		amount: section.querySelector('#amount').value,
	};
	if (cart.some((cake) => cake.cake === item.cake)) {
		let index = cart.findIndex((cake) => cake.cake === item.cake);
		cart[index].amount = (
			parseInt(cart[index].amount, 10) + parseInt(item.amount, 10)
		).toString();
		localStorage.setItem('cart', JSON.stringify(cart));
	} else {
		cart.push(item);
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	document.getElementById('card-num').innerHTML = cart.length;
};

window.handlerBtnBuy = (e) => {};
