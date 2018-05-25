import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { textTransform } from '../../../helpers/functions';

import { feedRequest, getFeed, getFeedError } from '../../../ducks/feed';

import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Error from '../../Error';

export class Feed extends PureComponent {

    componentDidMount() {
        this.props.feedRequest();
    }

    /**
     * Render 20 transactions in feed
     */
    renderFeed = data => {
        return data.map(item => {
            return (
                <div className="feed__item" key={item.id}>
                    <div className="feed__item-header">
                        <div className="feed__item-name">User ID: <span>{item.user_id}</span></div>
                        <div className="feed__item-date">{moment(item.created_at).format('HH:mm DD-MM-YY')}</div>
                    </div>
                    {textTransform(item.text)}
                </div>
            )
        })
    }
    
    render() {
        const { feed, error } = this.props;
        
        if (error) {
            return <Error isError="true" errorText={error} />
        } else {
            return (
                <main className="main-wrapper">
                    <Header title="Лента" />
                    <div className="main-content">
                        <div className="container">
                            <div className="feed">
                                {this.renderFeed(feed)}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            )
        }
    }
}

const mapStateToProps = state => ({
    feed: getFeed(state),
    error: getFeedError(state)
});

const mapDispatchToProps = { feedRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
