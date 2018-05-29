import React from 'react';
import moment from 'moment';
import { textTransform } from '../../../helpers/functions';

const FeedItem = ({item}) => {
    return (
        <div className="feed__item">
            <div className="feed__item-header">
                <div className="feed__item-name">User ID: <span>{item.user_id}</span></div>
                <div className="feed__item-date">{moment(item.created_at).format('HH:mm DD-MM-YY')}</div>
            </div>
            {textTransform(item.text)}
        </div>
    )
};

export default FeedItem;