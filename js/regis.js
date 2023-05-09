import { regis } from './auth.js';

let form = document.querySelector('form');

form.onsubmit = (e) => {
	e.preventDefault();
	if (e.target.password.value !== e.target.entryPassword.value) {
		form.querySelector('#error-message').innerHTML =
			'Mật khẩu không trùng khớp';
		('Chào mừng bạn đến với JERRY CHERRY');
	} else {
		regis(
			form,
			{
				email: e.target.email.value,
				phone_number: e.target.phoneNumber.value,
				username: e.target.username.value,
				password: e.target.password.value,
			},
			'Đăng ký thành công'
		);
	}
};
