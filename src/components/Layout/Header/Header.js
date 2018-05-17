import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { selectBtc, selectEth, getCurrentBtcSell, getCurrentEthSell } from '../../../ducks/currency';
import { getUserInfoRequest, getUserInfo } from '../../../ducks/user';

//  Logo
import logo from '../../../assets/img/Logo-white.svg';

class Header extends Component {

    componentDidMount() {
        const choosenCurrency = this.props.match.params.currency;

        this.chooseCurrency(choosenCurrency);
        this.props.getUserInfoRequest();
    }

    componentWillReceiveProps(nextProps) {
        const currentValue = this.props.match.params.currency;
        const nextValue = nextProps.match.params.currency;

        if (currentValue && currentValue !== nextValue) {
            this.chooseCurrency(nextValue);
        }
    }

    chooseCurrency = currency => {
        if (currency === 'btc') {
            this.props.selectBtc();
        } else {
            this.props.selectEth();
        }
    };

    render() {
        const currency = this.props.match.params.currency;
        const { userInfo, currentBtcSell, currentEthSell } = this.props;

        return (
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <a className="logo" href="/">
                            <img src={logo} alt="logo"/>
                        </a>
                        <div className="header__name">Торги</div>
                        <div className="currencies">
                            <Link
                                className={currency === 'btc' ?
                                'currencies__item currencies__item--active' :
                                'currencies__item'}
                                to="/trade/btc"
                            >
                                <div className="currencies__price">{ currentBtcSell }</div>
                                <div className="currencies__name">1 BTC</div>
                            </Link>
                            <Link
                                className={currency === 'eth' ?
                                'currencies__item currencies__item--active' :
                                'currencies__item'}
                                to="/trade/eth"
                            >
                                <div className="currencies__price">{ currentEthSell }</div>
                                <div className="currencies__name">1 ETH</div>
                            </Link>
                        </div>
                        <ul className="main-menu">
                            <li className="main-menu__item main-menu__item--tape">
                                <a className="main-menu__link" href="">Лента</a><span>1+</span>
                            </li>
                            <li className="main-menu__item">
                                <a className="main-menu__link" href="">3 место</a>
                            </li>
                            <li className="main-menu__item">
                                <a className="main-menu__link main-menu__link--user" href="">{userInfo.email}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    currentBtcSell: getCurrentBtcSell(state),
    currentEthSell: getCurrentEthSell(state),
    userInfo: getUserInfo(state)
});

const mapDispatchToProps = {
    selectBtc,
    selectEth,
    getUserInfoRequest
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);