import React, { Component } from 'react';
//  Logo
import logo from '../../assets/img/Logo.svg';

export default class Trade extends Component {

    handleChange = () => {
        console.log('change')
    };

    handleBuy = () => {

    };

    handleSell = () => {

    };

    render() {
        return (
            <div>
                <header className="header">
                    <div className="container">
                        <div className="header__wrapper">
                            <a className="logo" href="/">
                                <img src={logo} alt="logo"/>
                            </a>
                            <div className="header__name">Торги</div>
                            <div className="currencies">
                                <div className="currencies__item">
                                    <div className="currencies__price">4 277,5</div>
                                    <div className="currencies__name">1 BTC</div>
                                </div>
                                <div className="currencies__item">
                                    <div className="currencies__price">290</div>
                                    <div className="currencies__name">1 ETH</div>
                                </div>
                            </div>
                            <ul className="main-menu">
                                <li className="main-menu__item main-menu__item--tape">
                                    <a className="main-menu__link" href="">Лента</a><span>9+</span>
                                </li>
                                <li className="main-menu__item main-menu__item--active">
                                    <a className="main-menu__link" href="">3 место</a>
                                </li>
                                <li className="main-menu__item">
                                    <a className="main-menu__link main-menu__link--user" href="">user@mail.ru</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="content">
                        <div className="wrapper">
                            <div className="content__currency">
                                <h2 className="medium-title">Ваш счет</h2>
                                <div className="score">
                                    <div className="score__row">
                                        <div className="score__item"><span>12.</span>12332</div>
                                        <div className="score__name">ETH</div>
                                    </div>
                                    <div className="score__row">
                                        <div className="score__item"><span>1.</span>234032</div>
                                        <div className="score__name">BTC</div>
                                    </div>
                                    <div className="score__row">
                                        <div className="score__item"><span>1 123.</span>00</div>
                                        <div className="score__name">$</div>
                                    </div>
                                </div>
                                <h2 className="medium-title">Покупка/продажа</h2>
                                <div className="score">
                                    <div className="score__row">
                                        <input 
                                            className="score__item score__item--small score__item--btc"
                                            type="text" 
                                            value="0.2"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="score__row">
                                        <input 
                                            className="score__item score__item--small score__item--usd" 
                                            type="text" 
                                            value="55.43"
                                            onChange={this.handleChange}
                                        />
                                        <button 
                                            className="button button--red"
                                            onClick={this.handleBuy}
                                            >
                                            Купить
                                        </button>
                                    </div>
                                    <div className="score__row">
                                        <input 
                                            className="score__item score__item--small score__item--usd"
                                            type="text" 
                                            value="55.12" 
                                            onChange={this.handleChange}
                                        />
                                        <button 
                                            className="button button--blue"
                                            onClick={this.handleSell}
                                            >
                                            Продать
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="content__statistics">
                                <h2 className="medium-title">Окно графика</h2>
                                <div className="statistics__image">
                                    <img src="/assets/img/graph.jpg" alt=""/>
                                </div>
                                <h2 className="medium-title">История операций</h2>
                                <div className="statistics__history">
                                    <table className="statistics__table">
                                        <tbody>
                                            <tr className="statistics__tr">
                                                <th className="statistics__th">Операция</th>
                                                <th className="statistics__th">Дата</th>
                                                <th className="statistics__th">BTC</th>
                                                <th className="statistics__th">USD</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="statistics__footer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};