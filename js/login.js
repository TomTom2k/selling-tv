import { login } from './auth.js';

let form = document.querySelector('form');

form.onsubmit = (e) => {
	e.preventDefault();
	login(
		form,
		{
			username: e.target.username.value,
			password: e.target.password.value,
		},
		'Chào mừng bạn trở lại JERRY CHERRY'
	);
};
