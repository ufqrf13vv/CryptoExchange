import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { fetchWalletRequest, getWalletData } from '../../ducks/wallet';

import { walletNumTransform } from '../../helpers/functions';

class Wallet extends PureComponent {

    componentDidMount() {
        this.props.fetchWalletRequest();
    }

    render() {
        const { wallet } = this.props;

        return (
            <div className="score">
                <div className="score__row">
                    <div className="score__item">
                        {walletNumTransform(wallet.eth)}
                    </div>
                    <div className="score__name">ETH</div>
                </div>
                <div className="score__row">
                    <div className="score__item">
                        {walletNumTransform(wallet.btc)}
                    </div>
                    <div className="score__name">BTC</div>
                </div>
                <div className="score__row">
                    <div className="score__item">
                        {walletNumTransform(wallet.usd)}
                    </div>
                    <div className="score__name">$</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    wallet: getWalletData(state)
});

const mapDispatchToProps = {
    fetchWalletRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet);