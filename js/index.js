import products from '../data/products.json' assert { type: 'json' };
let event = document.getElementById('event');

// render event
let renderSlide = (data) => {
	let slider = event.querySelector('#slider');
	let html = data.map(
		(slide) => `
	<div class="slide">
		<img src=${slide.image} alt="">
		<p>${slide.title}</p>
	</div>
	`
	);
	slider.innerHTML += html.join('');
	navigate(data);
};

// navigate logic
let navigate = (data) => {
	let slider = event.querySelector('#slider');
	let slide = 0;
	const len = data.length;
	let widthSlide = slider.offsetWidth;
	const btnPrev = event.querySelector('#btnPrev');
	const btnNext = event.querySelector('#btnNext');
	btnPrev.onclick = () => {
		if (slide === 0) slide = len - 1;
		else slide--;
		slider.style.left = `-${widthSlide * slide}px`;
	};
	btnNext.onclick = () => {
		if (slide === len - 1) slide = 0;
		else slide++;
		slider.style.left = `-${widthSlide * slide}px`;
	};

	// autoslide
	setInterval(() => {
		if (slide === len - 1) slide = 0;
		else slide++;
		slider.style.left = `-${widthSlide * slide}px`;
	}, 10000);
};

renderSlide(products);

// render product
let renderNew = (data) => {
	let newProducts = document.getElementById('newProducts');
	let html = data.map((newP, index) => {
		return index < 6
			? `
			<a href="./product.html" class="product"  onclick="handlerProduct(this)" id=${
				newP.id
			}>
				<img src=${newP.image} alt="">
				<p>${Intl.NumberFormat().format(newP.price)} VND</p>
			</a>
		`
			: '';
	});
	newProducts.innerHTML = html.join('');
};
let renderSale = async (data) => {
	let saleProducts = document.getElementById('saleProducts');
	let html = '';
	html = data.map((saleP, index) => {
		return index < 6 && saleP.sale !== 0
			? `
			<a href="./product.html" class="item" onclick="handlerProduct(this)" id=${
				saleP.id
			}>
				<img src=${saleP.image} alt="">
				<h5 class="name">${saleP.title}</h5>
				<p class="price">
					<p class="old">${Intl.NumberFormat().format(saleP.price)} VND</p>
				</p>
			</a>
		`
			: '';
	});
	saleProducts.innerHTML = html.join('');
	saleProducts.innerHTML += `
		<a href="./category.html" class="item end">
			<i class="fa-solid fa-plus"></i>
		</a>
	`;
};

renderNew(products);
renderSale(products);
