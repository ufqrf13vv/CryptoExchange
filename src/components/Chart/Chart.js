import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-easy-chart';
import moment from 'moment';

import {
    getOffsetCurrency,
    getSelectedCurrency,
    sellBtc,
    sellEth,
    purchaseBtc,
    purchaseEth,
    selectOffset
} from '../../ducks/currency';

class Chart extends Component {
    render() {
        const { sellBtc, purchaseBtc, sellEth, purchaseEth, selectedCurrency } = this.props;

        return (
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
        )
    }
}

const mapStateToProps = state => ({
    sellBtc: sellBtc(state),
    sellEth: sellEth(state),
    purchaseBtc: purchaseBtc(state),
    purchaseEth: purchaseEth(state),
    selectedCurrency: getSelectedCurrency(state)
});

const mapDispatchToProps = {
    selectOffset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart);