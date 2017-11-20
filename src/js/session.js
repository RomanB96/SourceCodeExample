import $ from 'jquery';

export default function session() {
	try {
		let date = new Date();
		let components = [
			date.getYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
			date.getMilliseconds()
		];
		let id = components.join('');

		sessionStorage.setItem('Id', id );
	} catch (e) {
		console.error(e, e.stack);
	}
}