import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { selectBtc, selectEth, getCurrentBtcSell, getCurrentEthSell } from '../../../ducks/currency';
import { getUserInfo } from '../../../ducks/user';

import logo from '../../../assets/img/Logo-white.svg';

class Header extends PureComponent {
    /**
     * Choose new currency to display
     */
    componentWillReceiveProps(nextProps) {
        const currentValue = this.props.match.params.currency;
        const nextValue = nextProps.match.params.currency;

        if (currentValue && currentValue !== nextValue) {
            if (nextValue === 'btc') {
                this.props.selectBtc();
            } else {
                this.props.selectEth();
            }
        }
    }

    render() {
        const currency = this.props.match.params.currency;
        const { userInfo, currentBtcSell, currentEthSell, title } = this.props;

        return (
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="header__name">{title}</div>
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
                                <Link className="main-menu__link" to="/feed">Лента</Link>
                            </li>
                            <li className="main-menu__item">
                                <Link className="main-menu__link main-menu__link--user" to="/profile">{userInfo ? userInfo.email : ''}</Link>
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
    selectEth
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));