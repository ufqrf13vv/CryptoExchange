import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getUserInfo, getUserActivityRequest, getUserActivity } from '../../../ducks/user';
import { getWalletBalance } from '../../../ducks/wallet';

import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Wallet from '../../Wallet';
import Feed from '../FeedPage/Feed';

export class ProfilePage extends PureComponent {

    componentDidMount() {
        const { userInfo } = this.props;

        if (userInfo) this.props.getUserActivityRequest(userInfo.id);
    }

    render() {
        const { userInfo, balance, userActivity } = this.props;

        return (
            <main className="main-wrapper">
                <Header title="Профиль" />
                <div className="main-content">
                    <div className="container">
                    <div className="profile">
                        <div className="profile__block">
                            <h2 className="medium-title">Личный профиль</h2>
                            <div className="profile__row">
                            <div className="profile__label">Логин:</div>
                            <div className="profile__login">{userInfo.email}</div>
                            </div>
                        </div>
                        <div className="profile__block">
                            <h2 className="medium-title">Ваш счет</h2>
                            <Wallet />
                            <h3 className="medium-title">Сумма накоплений</h3>
                            <div className="profile__sum">~{balance} $</div>
                        </div>
                        </div>
                        <h2 className="medium-title medium-title--center">Ваша последняя активность</h2>
                        {userActivity ?
                            (<Feed data={userActivity} />) :
                            (null)
                        }
                    </div>
                </div>
                <Footer />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: getUserInfo(state),
    userActivity: getUserActivity(state),
    balance: getWalletBalance(state)
});

const mapDispatchToProps = { getUserActivityRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);