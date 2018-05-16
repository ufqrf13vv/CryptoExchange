import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//  Components
import Chart from '../Chart';

import {
    selectBtc,
    selectEth,
    fetchBtcRequest,
    fetchEthRequest,
    getOffset,
    selectOffset,
    sellBtc,
    sellEth,
    purchaseBtc,
    purchaseEth
} from '../../ducks/currency';
import { fetchWalletRequest, getWalletData } from '../../ducks/wallet';
import { getUserInfoRequest, getUserInfo } from '../../ducks/user';
//  Logo
import logo from '../../assets/img/Logo.svg';

const offsets = {
    '2h': '2ч',
    '4h': '4ч',
    '8h': '8ч',
    '1d': '1д',
    '7d': '7д'
};

class Trade extends PureComponent {

    state = {
        inputFiat: 1,
        inputSell: 10,
        inputBuy: 20,
        currentInput: 'inputFiat'
    };

    handleChange = event => {
        const { name, value } = event.target;

        if (isNaN(event.target.value) || event.target.value === '') {
            this.setState(state => ({[name]: 1}));
        } else {
            this.setState(state => ({[name]: value}));
        }
    };

    handleBuy = () => {

    };

    handleSell = () => {

    };

    componentDidMount() {
        this.props.getUserInfoRequest();
        this.props.fetchWalletRequest();
        this.props.fetchBtcRequest('4h');
        this.props.fetchEthRequest('4h');
    };

    render() {
        const { inputFiat, inputSell, inputBuy } = this.state;
        const { wallet } = this.props;
        const { sellBtc, sellEth, purchaseBtc, purchaseEth } = this.props;

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
                                        <div className="score__item">{wallet.eth}</div>
                                        <div className="score__name">ETH</div>
                                    </div>
                                    <div className="score__row">
                                        <div className="score__item">{wallet.btc}</div>
                                        <div className="score__name">BTC</div>
                                    </div>
                                    <div className="score__row">
                                        <div className="score__item">{wallet.usd}</div>
                                        <div className="score__name">$</div>
                                    </div>
                                </div>
                                <h2 className="medium-title">Покупка/продажа</h2>
                                <div className="score">
                                    <div className="score__row">
                                        <input
                                            className="score__item score__item--small score__item--btc"
                                            type="text"
                                            name="inputFiat"
                                            value={inputFiat}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="score__row">
                                        <input
                                            className="score__item score__item--small score__item--usd"
                                            type="text"
                                            name="inputBuy"
                                            value={inputBuy}
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
                                            name="inputSell"
                                            value={inputSell}
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
                                <Chart />
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
}

const mapStateToProps = state => ({
    userInfo: getUserInfo(state),
    wallet: getWalletData(state),
    sellBtc: sellBtc(state),
    sellEth: sellEth(state),
    purchaseBtc: purchaseBtc(state),
    purchaseEth: purchaseEth(state)
});

const mapDispatchToProps = {
    fetchBtcRequest,
    fetchEthRequest,
    fetchWalletRequest,
    getUserInfoRequest,
    getUserInfo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Trade);