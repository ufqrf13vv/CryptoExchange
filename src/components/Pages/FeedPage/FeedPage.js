import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { feedRequest, getFeed, getFeedError } from '../../../ducks/feed';

import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Error from '../../Error';
import Feed from './Feed';

export class FeedPage extends PureComponent {

    componentDidMount() {
        this.props.feedRequest();
    }
    
    render() {
        const { feed, error } = this.props;
        
        if (error) {
            return <Error isError errorText={error} />
        } else {
            return (
                <main className="main-wrapper">
                    <Header title="Лента" />
                    <div className="main-content">
                        <div className="container">
                            <Feed data={feed} />
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
)(FeedPage);
