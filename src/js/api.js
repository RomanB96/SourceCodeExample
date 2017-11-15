import $ from 'jquery';

class Api {
    constructor() {
        this.apiButton = $('.apiButton');
    }

    appendStaticResult() {
        $('.apiButton')
            .html('Loading...');

        $.ajax({
            type:"GET",
            url:"https://api.meetup.com/2/cities",
            success: function(data) {
                let results = data.results;
                results.forEach((result) => {
                    let node = `
                        <ul>
                            <li>Meetup zip: ${result.zip}</li>
                            <li>City: ${result.city}</li>
                            <li>Country: ${result.localized_country_name}</li>
                            <li>Members count: ${result.member_count}</li>
                            <li>Ranking: ${result.ranking}</li>
                        </ul>
                    `;

                    $('.aside__cities')
                        .append(node);
                });

                $('.aside__title')
                    .html('Not that useless!');

                $('.apiButton')
                    .html('Ta-daaan!')
                    .off('click');
            },
            dataType: 'jsonp',
        });
    }

    init() {
        try {
            this.apiButton
                .on('click', this.appendStaticResult);

        } catch (e) {
            console.error(e, e.stack);
        }
    }
}

const api = new Api().init();

export default api;