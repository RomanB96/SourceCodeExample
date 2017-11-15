import $ from 'jquery';
import css from './css';
import email from './email';
import ajax from './ajax';
import api from './api';
import removePreloader from './preloader';

$(document).ready(function () {
    css.init(removePreloader);
    email;
    ajax;
    api;
});