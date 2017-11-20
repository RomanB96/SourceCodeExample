import $ from 'jquery';
import css from './css';
import session from './session';
import email from './email';
import ajax from './ajax';
import api from './api';
import removePreloader from './preloader';

$(document).ready(function () {
    css.init(removePreloader);
    session();
    email;
    ajax;
    api;
});