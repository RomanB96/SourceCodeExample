import $ from 'jquery';

class Api {
    constructor() {
        this.apiButton = $('.apiButton');
        this.asideTitle = $('.aside__title');
        this.asideMeetups = $('.aside__meetups');
    }

    appendStaticResult(button, title, container) {
        button.html('Loading...');

        $.ajax({
            type: "GET",
            url: "https://api.meetup.com/2/cities",
            data: {
                page: 5
            },
            success: function (data) {
                let results = data.results;
                results.forEach((result) => {
                    let node = `
                        <ul class="aside__meetup">
                            <li class="meetup__info">Meetup zip: ${result.zip}</li>
                            <li class="meetup__info">City: ${result.city}</li>
                            <li class="meetup__info">Country: ${result.localized_country_name}</li>
                            <li class="meetup__info">Members count: ${result.member_count}</li>
                            <li class="meetup__info">Ranking: ${++result.ranking}</li>
                        </ul>
                    `;
                    container.append(node);
                });

                title.html('Not that useless!');

                button
                    .html('Ta-daaan! Top 5 Meetups!')
                    .off('click')
                    .attr('disabled', 'disabled');
            },
            dataType: 'jsonp',
        });
    }

    init() {
        try {
            this.apiButton.on('click', () => {
                this.appendStaticResult(this.apiButton, this.asideTitle, this.asideMeetups);
            });

        } catch (e) {
            console.error(e, e.stack);
        }
    }
}

const api = new Api().init();

export default api;