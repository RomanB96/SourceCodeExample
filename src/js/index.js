import $ from 'jquery';
import css from './css';
import email from './email';
import removePreloader from './preloader';

$(document).ready(function () {
    css.init(removePreloader);
    email;
});