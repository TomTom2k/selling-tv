import { username } from './auth.js';
let paths = location.pathname.split('/');
let path = paths[paths.length - 1];
if (!username && (path === 'account.html' || path === 'cart.html')) {
	location.pathname = location.pathname.replace(path, 'login.html');
}

window.handlerProduct = (e) => {
	sessionStorage.setItem('id', e.id);
};
