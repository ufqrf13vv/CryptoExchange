import React, { Component } from 'react';

import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Chart from '../../Chart';
import Trade from '../../Trade';
import Wallet from '../../Wallet';
import Transactions from '../../Transactions';

export default class TradePage extends Component {
    render() {
        return (
            <main className="main-wrapper">
                <div className="main-content">
                    <Header title="Торги" />
                        <div className="container">
                            <div className="content">
                                <div className="wrapper">
                                    <div className="content__currency">
                                        <h2 className="medium-title">Ваш счет</h2>
                                        <Wallet />
                                        <h2 className="medium-title">Покупка/продажа</h2>
                                        <Trade />
                                    </div>
                                    <div className="content__statistics">
                                        <h2 className="medium-title">Окно графика</h2>
                                        <Chart />
                                        <h2 className="medium-title">История операций</h2>
                                        <Transactions />
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <Footer />
            </main>
        )
    }
}
