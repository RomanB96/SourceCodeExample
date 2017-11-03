import $ from 'jquery';

class Preloader {
	constructor() {
		this.selector         = $('.spinner');
		this.container        = $('.container');
		this.container_hidden = $('.container--hidden');
	}

	remove() {
        try {
			this.container_hidden
				.removeClass('container--hidden')
				.addClass('container');
			
			this.selector
				.addClass('spinner--hidden');
		} catch (e) {
			console.error(e, e.stack);
		}
    }
}

const preloader = new Preloader();

export default preloader;