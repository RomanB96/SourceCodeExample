import $ from 'jquery';
import css from './css';
import email from './email';
import preloader from './preloader';

$(document).ready(function () {
    css.init(preloader.remove);
    email.init();
});