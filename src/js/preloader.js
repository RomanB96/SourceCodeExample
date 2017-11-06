import $ from 'jquery';

export default function removePreloader() {
	try {
		let selector  = $('.spinner');
		let container = $('.container--hidden');

		container
			.addClass('container')
			.removeClass('container--hidden');

		selector
			.addClass('spinner--hidden');

	} catch (e) {
		console.error(e, e.stack);
	}
}