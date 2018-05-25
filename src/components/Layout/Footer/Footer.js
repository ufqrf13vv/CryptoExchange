import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/img/Logo-white.svg';

export default class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer__wrapper">
                        <div className="footer__block">
                            <div className="footer__copyright">Сделано с любовью и старанием<br/>на курсе «React.js» в
                                LoftSchool.<br/>Автор работы: <b>Рагулин Михаил</b></div>
                        </div>
                        <ul className="footer__menu">
                            <li className="footer__menu-item">
                                <Link className="footer__menu-link" to="/feed">Лента</Link>
                            </li>
                            <li className="footer__menu-item">
                                <Link className="footer__menu-link" to="/trade/btc">Торги</Link>
                            </li>
                            <li className="footer__menu-item">
                                <Link className="footer__menu-link" to="/profile">Профиль</Link>
                            </li>
                        </ul>
                        <Link className="logo" to="/trade/btc">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                </div>
            </footer>
        )
    }
}