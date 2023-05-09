import products from '../data/products.json' assert { type: 'json' };
import tags from '../data/tags.json' assert { type: 'json' };
const { createStore } = window.Redux;

window.showAside = () => {
	document.querySelector('aside').classList.toggle('active');
};
// create store
let initialState = products;

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'category': {
			if (action.condition === '0') {
				renderProductsList(state);
				return state;
			}
			let newData = state.filter((product) =>
				product.category.some(
					(type) => parseInt(type.id) === parseInt(action.condition)
				)
			);
			renderProductsList(newData);
			return state;
		}

		default:
			return state;
	}
};

const store = createStore(productsReducer);
// render Products
const renderProductsList = async (productsList) => {
	if (!Array.isArray(productsList) || productsList.length === 0) return;

	const sectionElement = document.querySelector('section');
	if (!sectionElement) return;

	sectionElement.innerHTML = '';
	let html = productsList.map(
		(product) => `
	<a href="./product.html" class="item" onclick="handlerProduct(this)" id=${
		product.id
	}>
		<img src=${product.image} alt="">
		<h5 class="name">${product.title}</h5>
		<p class="price">${Intl.NumberFormat().format(product.price)} VND</p>
	</a>
	`
	);

	sectionElement.innerHTML = html.join('');
};

// render category
let renderCategory = async (data) => {
	let category = document.querySelector('.list-category');
	let html = data.map(
		(type) =>
			`<li class="type"  onclick="changeCategory(this)" id=${type.id}>${type.name}</li>`
	);
	if (category) {
		category.innerHTML = `<li class="type"  onclick="changeCategory(this)" id="0">tất cả</li>`;
		category.innerHTML += html.join('');
	}
};

let getTags = async () => {
	let res = await fetch(url + '/product/category/');
	let data = await res.json();
	renderCategory(data);
};

renderCategory(tags);
renderProductsList(products);

window.changeCategory = (e) => {
	const action = {
		type: 'category',
		condition: e.id,
	};
	store.dispatch(action);
};
