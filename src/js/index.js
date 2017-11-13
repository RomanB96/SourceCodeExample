import $ from 'jquery';
import css from './css';
import email from './email';
import ajax from './ajax';
import removePreloader from './preloader';

$(document).ready(function () {
    css.init(removePreloader);
    email;
    ajax;
});