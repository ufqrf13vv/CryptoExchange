import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    fetchBtcRequest,
    fetchEthRequest,
    getSelectedCurrency,
    getCurrentBtcSell,
    getCurrentEthSell,
    getCurrentBtcBuy,
    getCurrentEthBuy
} from '../../ducks/currency';
import { buyCurrencyRequest, sellCurrencyRequest, getError } from '../../ducks/wallet';

import Error from '../Error';

class Trade extends PureComponent {

    state = {
        inputFiat: 1,
        currentInput: 'inputFiat',
        inputSell: this.props.sell,
        inputBuy: this.props.buy
    };

    componentWillReceiveProps(nextProps) {
        const { sell, buy } = nextProps;
        const { currentInput } = this.state;

        this.changeInputs(currentInput, sell, buy);
    }

    /**
     * Change input state
     */
    onInputChange = event => {
        const { name, value } = event.target;
        const { sell, buy } = this.props;

        if (isNaN(event.target.value) || event.target.value === '') {
            this.setState(state => ({[name]: 1}));
        } else {
            this.setState(state => ({[name]: value}));
            this.changeInputs(name, sell, buy);
        }
    };

    onInputFocus = event => {
        this.setState({ currentInput: event.target.name });
    };

    inInputBlur = () => {
        this.setState({ currentInput: 'inputFiat' });
    };

    /**
     * Buy chosen currency
     */
    handleBuy = () => {
        const { currencyName } = this.props;
        const { inputFiat } = this.state;

        this.props.buyCurrencyRequest({ currencyName, value: inputFiat });
    };

    /**
     * Sell chosen currency
     */
    handleSell = () => {
        const { currencyName } = this.props;
        const { inputFiat } = this.state;

        this.props.sellCurrencyRequest({ currencyName, value: inputFiat });
    };

    /**
     * Change value in the selected input
     * @param {string} name 
     * @param {number} sell 
     * @param {number} buy 
     */
    changeInputs(name, sell, buy) {
        switch (name) {
            case 'inputFiat': {
                this.setState(({ inputFiat }) => {
                    const parsed = isNaN(inputFiat) ? 0 : parseFloat(inputFiat);

                    return {
                        inputSell: parsed * sell,
                        inputBuy: parsed * buy
                    };
                });
                break;
            }
            case 'inputSell':
                this.setState(({ inputSell }) => {
                    const parsedSell = isNaN(inputSell) ? 0 : parseFloat(inputSell);
                    const nextItem = parsedSell / sell;

                    return {
                        inputFiat: nextItem,
                        inputBuy: nextItem * buy
                    };
                });
                break;
            case 'inputBuy':
                this.setState(({ inputBuy }) => {
                    const parsedBuy = isNaN(inputBuy) ? 0 : parseFloat(inputBuy);
                    const nextFiat = parsedBuy / buy;

                    return {
                        inputFiat: nextFiat,
                        inputSell: nextFiat * sell
                    };
                });
                break;
            default:
                break;
        }
    }

    render() {
        const { inputFiat, inputSell, inputBuy } = this.state;
        const { error } = this.props;

        return (
            <div className="score">
                <div className="score__row">
                    <input
                        className="score__item score__item--small score__item--btc"
                        type="text"
                        name="inputFiat"
                        value={inputFiat}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.inInputBlur}
                    />
                </div>
                <div className="score__row">
                    <input
                        className="score__item score__item--small score__item--usd"
                        type="text"
                        name="inputBuy"
                        value={inputBuy}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.inInputBlur}
                        disabled="disabled"
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
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.inInputBlur}
                        disabled="disabled"
                    />
                    <button
                        className="button button--blue"
                        onClick={this.handleSell}
                    >
                        Продать
                    </button>
                </div>
                {error && <Error isError errorText="Ошибка!!!" />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sell: getSelectedCurrency(state) === 'btc' ? getCurrentBtcSell(state) : getCurrentEthSell(state),
    buy: getSelectedCurrency(state) === 'btc' ? getCurrentBtcBuy(state) : getCurrentEthBuy(state),
    currencyName: getSelectedCurrency(state),
    error: getError(state)
});

const mapDispatchToProps = {
    fetchBtcRequest,
    fetchEthRequest,
    buyCurrencyRequest,
    sellCurrencyRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Trade);