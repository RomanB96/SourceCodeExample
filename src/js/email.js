import $ from 'jquery';

class Email {
	constructor() {
		this.selector = $('.email');
	}

	replaceLink(evt) {
		let hrefReplaced = $(evt.target)
			.attr('href')
			.replace(/AT/, '@')
			.replace(/DOT/, '.');

		$(evt.target)
			.attr('href', hrefReplaced);
	}

	init() {
		try {
			this.selector
				.on('click mouseover focus', this.replaceLink);
		} catch (e) {
			console.error(e, e.stack);
		}
	}
}

const email = new Email().init();

export default email;