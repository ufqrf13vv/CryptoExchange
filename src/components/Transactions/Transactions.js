import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchUserTransactionsRequest, getUserTransactions, userTransactionsIsLoading } from '../../ducks/transactions';
import { getSelectedCurrency } from "../../ducks/currency";

class Transactions extends Component {

    componentDidMount() {
        this.props.fetchUserTransactionsRequest();
    }

    /**
     * Display table with all user transactions
     */
    renderTable = (transactions, currency) => {
        return transactions.map(item => {
            if (currency === 'btc') {
                if ('btc_delta' in item) {
                    return (
                        <tr className="statistics__tr" key={ item.id }>
                            <td className="statistics__td">{ item.btc_delta > 0 ? 'Покупка' : 'Продажа' }</td>
                            <td className="statistics__td">{ moment(item.created_at).format('DD.MM.YY HH:mm') }</td>
                            <td className="statistics__td">{ Number(item.btc_delta) }</td>
                            <td className="statistics__td">{ parseFloat(item.usd_delta) }</td>
                        </tr>
                    )
                }
            } else {
                if ('eth_delta' in item) {
                    return (
                        <tr className="statistics__tr" key={ item.id }>
                            <td className="statistics__td">{ item.eth_delta > 0 ? 'Покупка' : 'Продажа' }</td>
                            <td className="statistics__td">{ moment(item.created_at).format('DD.MM.YY HH:mm') }</td>
                            <td className="statistics__td">{ Number(item.eth_delta) }</td>
                            <td className="statistics__td">{ parseFloat(item.usd_delta) }</td>
                        </tr>
                    )
                }
            }
        })
    };

    render() {
        const { userTransactions, currency, isLoading } = this.props;

        return (
            <div className="statistics__history">
                <table className="statistics__table">
                    <tbody>
                    <tr className="statistics__tr">
                        <th className="statistics__th">Операция</th>
                        <th className="statistics__th">Дата</th>
                        <th className="statistics__th">{currency === 'btc' ? 'BTC' : 'ETH'}</th>
                        <th className="statistics__th">USD</th>
                    </tr>
                    {!isLoading && this.renderTable(userTransactions, currency)}
                    </tbody>
                </table>
                <div className="statistics__footer">
                    <div className="statistics__pagination">
                        <button className="statistics__pagination-btn statistics__pagination-btn--prev"></button>
                        <button className="statistics__pagination-btn statistics__pagination-btn--active">1</button>
                        <button className="statistics__pagination-btn">2</button>
                        <button className="statistics__pagination-btn">3</button>
                        <button className="statistics__pagination-btn">4</button>
                        <button className="statistics__pagination-btn statistics__pagination-btn--next"></button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: userTransactionsIsLoading(state),
    userTransactions: getUserTransactions(state),
    currency: getSelectedCurrency(state)
});

const mapDispatchToProps = {
    fetchUserTransactionsRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transactions);