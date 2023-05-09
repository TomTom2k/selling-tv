import { username, cart } from './auth.js';
import products from '../data/products.json' assert { type: 'json' };

window.showNavbar = () => {
	let nav = document.querySelector('header nav');
	nav.classList.toggle('active');
};

let header = document.querySelector('header');
let hrefAcc = username ? './account.html' : './login.html';

header.innerHTML = `
        <a href="./index.html" class="logo">
            <p class="text-left"><span>S</span>mart</p>
            <p class="text-right">&emsp;<span>S</span>hop</p>
        </a>
        
        <nav class="">
            <ul>
                <li><a href="./index.html">Trang Chủ</a></li>
                <li><a href="./category.html">Danh sách</a></li>
                <li><a href="./support.html">Hỗ trợ</a></li>
                <li><a href="./introduce.htm">Giới thiệu</a></li>
                <li><a href="./news.html">Tin tức</a></li>
            </ul>
        </nav>
        <div class="icons">
            <div>
                <i id="search" class="fas fa-search"></i>
                <div class="pop-up">
                    <input type="text">
                    <div class="list-item">
                        
                    </div>
                </div>
            </div>
            <a href="./cart.html" id="cart"><i class="fas fa-shopping-cart"><span id="card-num">${cart.length}</span></i></a>
            <a href=${hrefAcc}><i class="fas fa-user"></i></a>
            <div>
                <i id="bars" class="fas fa-bars" onclick="showNavbar()"></i>
            </div>
        </div>
`;

let search = document.getElementById('search');
let popup = search.parentElement.querySelector('.pop-up');
let input = popup.querySelector('input');
let html = popup.querySelector('.list-item');
html.innerHTML = 'Không tìm thấy';

search.onclick = () => {
	search.parentElement.querySelector('.pop-up').classList.toggle('active');
};

input.onchange = () => {
	html.innerHTML = '';
	let searchP = products.filter((product) =>
		product.name.toLowerCase().includes(input.value.toLowerCase())
	);
	if (searchP.length === 0) {
		html.innerHTML = 'Không tìm thấy';
	} else {
		let list = searchP.slice(0, 6).map(
			(p) => `
            <a href="./product.html" class="search-item"  onclick="handlerProduct(this)" id=${p.id}>
                <img src=${p.image}>
                <p>${p.title}</p>
            </a>
        `
		);
		html.innerHTML = list.join('');
	}
};
