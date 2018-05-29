import React, { PureComponent } from 'react';
import FeedItem from './FeedItem';

export default class Feed extends PureComponent {
    /**
     * Render 20 transactions in feed
     */
    renderFeed = data => {
        return data.map(item => {
            return (
                <FeedItem
                    key={item.id}
                    item={item}
                />
            )
        })
    };

    render() {
        const { data } = this.props;

        return (
            <div className="feed">
                {this.renderFeed(data)}
            </div>
        )
    }
}