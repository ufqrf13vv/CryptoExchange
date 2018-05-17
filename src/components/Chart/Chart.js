import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-easy-chart';
import moment from 'moment';

import {
    getSelectedOffset,
    getSelectedCurrency,
    sellBtc,
    sellEth,
    purchaseBtc,
    purchaseEth,
    selectOffset,
    fetchBtcRequest,
    fetchEthRequest,
    btcIsLoading,
    ethIsLoading
} from '../../ducks/currency';

import Loader from '../Loader';

const offsets = {
    '2h': '2ч',
    '4h': '4ч',
    '8h': '8ч',
    '1d': '1д',
    '7d': '7д'
};

class Chart extends Component {

    componentDidMount() {
        this.props.fetchBtcRequest('4h');
        this.props.fetchEthRequest('4h');
    };

    handleClick = event => {
        const { offset } = event.target.dataset;
        const { selectedCurrency } = this.props;

        this.props.selectOffset(offset);

        if (selectedCurrency === 'btc') {
            this.props.fetchBtcRequest(offset);
        } else {
            this.props.fetchEthRequest(offset);
        }
    };

    offsetButtons = offset => {
        return Object.keys(offsets).map(item => (
            <button
                className={offset === item ? 'statistics__chart-btn statistics__chart-btn--active' : 'statistics__chart-btn'}
                onClick={this.handleClick}
                key={ item }
                data-offset={ item } >
                {offsets[item]}
            </button>
        ));
    };

    render() {
        const { sellBtc, purchaseBtc, sellEth, purchaseEth, selectedCurrency, offset } = this.props;
        const { btcIsLoading, ethIsLoading } = this.props;

        return (
            <div className="statistics__chart">
                <div className="statistics__chart-header">
                    { this.offsetButtons(offset) }
                </div>
                {btcIsLoading || ethIsLoading ?
                    (<Loader isLoading="true"/>) : (
                    <Fragment>
                        {selectedCurrency === 'btc' ? (
                            <LineChart
                                lineColors={['blue', 'red']}
                                axes
                                grid
                                verticalGrid
                                interpolate={'cardinal'}
                                xType={'time'}
                                datePattern={'%d-%m %H:%M'}
                                width={750}
                                height={400}
                                style={{
                                '.axis path': {
                                    stroke: '#EDF0F1'
                                }
                            }}
                                data={[
                                sellBtc.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
                                purchaseBtc.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value}))
                            ]}
                            />
                        ) : (
                            <LineChart
                                lineColors={['blue', 'red']}
                                axes
                                grid
                                verticalGrid
                                interpolate={'cardinal'}
                                xType={'time'}
                                datePattern={'%d-%m %H:%M'}
                                width={750}
                                height={400}
                                style={{
                                '.axis path': {
                                    stroke: '#EDF0F1'
                                }
                            }}
                                data={[
                                sellEth.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
                                purchaseEth.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value}))
                            ]}
                            />
                        )}
                    </Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sellBtc: sellBtc(state),
    sellEth: sellEth(state),
    purchaseBtc: purchaseBtc(state),
    purchaseEth: purchaseEth(state),
    offset: getSelectedOffset(state),
    selectedCurrency: getSelectedCurrency(state),
    btcIsLoading: btcIsLoading(state),
    ethIsLoading: ethIsLoading(state)
});

const mapDispatchToProps = {
    selectOffset,
    fetchBtcRequest,
    fetchEthRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart);