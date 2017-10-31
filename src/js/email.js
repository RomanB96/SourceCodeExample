class Email {
	constructor() {
		this.selector = $('.email');
	}

	replaceLink(e) {
		this.selector.href
			.replace(/AT/,'&#64;')
			.replace(/DOT/,'&#46;');
	}

	init() {
		try {
			this.selector.on('click', replaceLink());
			this.selector.on('onmouseover', replaceLink());
			this.selector.on('onfocus', replaceLink());
		} catch (e) {
			console.error(e, e.stack);
		}
	}
}

const email = new Email();

export default email;