import { username, logout } from './auth.js';
import accounts from '../data/accounts.json' assert { type: 'json' };

let account = accounts.filter((account) => account.username === username)[0];

let leftSite = document.querySelector('.left-site');
let button = leftSite.querySelector('button');
button.onclick = () => {
	logout();
};

let setInfo = (data) => {
	leftSite.querySelector('#username').innerHTML = data.username;
	leftSite.querySelector('#phoneNumber').innerHTML = data.phone_number;
	leftSite.querySelector('#email').innerHTML = data.email;
};

setInfo(account);
