import accounts from '../data/accounts.json' assert { type: 'json' };
export let username = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

export let cart = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: [];

// hàm đăng nhập
export let login = (form, dataLogin, welcomeText) => {
	let account = accounts.filter(
		(account) => account.username === dataLogin.username
	)[0];
	if (account) {
		if (dataLogin?.password === account.password) {
			let paths = location.pathname.split('/');
			let path = paths[paths.length - 1];
			username = account.username;
			localStorage.setItem('user', JSON.stringify(username));
			alert(welcomeText);
			location.pathname = location.pathname.replace(path, 'account.html');
		} else {
			form.querySelector('#error-message').innerHTML =
				'<ật khẩu không hợp lệ';
		}
	} else {
		form.querySelector('#error-message').innerHTML =
			'Tài khoản chưa tồn tại';
	}
};

export let logout = () => {
	let paths = location.pathname.split('/');
	let path = paths[paths.length - 1];
	username = null;
	localStorage.removeItem('user');
	location.pathname = location.pathname.replace(path, 'login.html');
};

export let regis = (form, dataRegis, welcomeText) => {
	let account = accounts.filter(
		(account) => account.username === dataRegis.username
	)[0];
	if (!account) {
		let paths = location.pathname.split('/');
		let path = paths[paths.length - 1];
		alert(welcomeText);
		username = dataRegis.username;
		localStorage.setItem('user', JSON.stringify(username));
		location.pathname = location.pathname.replace(path, 'account.html');
	} else {
		form.querySelector('#error-message').innerHTML = 'Tài khoản đã tồn tại';
	}
};
