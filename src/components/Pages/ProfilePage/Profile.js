import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getUserInfo, getUserActivityRequest, getUserActivity } from '../../../ducks/user';

import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Error from '../../Error';
import Wallet from '../../Wallet';

export class Profile extends PureComponent {

    componentDidMount() {
        const { userInfo } = this.props;

        this.props.getUserActivityRequest(userInfo.id);
    }

    render() {
        const { userInfo } = this.props;

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
                            <div className="profile__sum">1000 $</div>
                        </div>
                        </div>
                        <h2 className="medium-title">Ваша последняя активность</h2>
                        <div className="feed">
                        <div className="feed__item">
                            <div className="feed__item-header">
                                <div className="feed__item-name">Name</div>
                                <div className="feed__item-date">01.01.2018</div>
                            </div>
                            <div className="feed__item-text feed__item-text--sell">Купил 0.3 BTC за 199$</div>
                        </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: getUserInfo(state),
    userActivity: getUserActivity(state)
});

const mapDispatchToProps = { getUserActivityRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);