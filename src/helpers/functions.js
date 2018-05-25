import React, { Fragment } from 'react';

export const textTransform = text => {
    let arr = text.split(',');
    let element = '';
    let result = '';

    element = arr[1].trim();

    if (element.substring(0, 1) === '+') {
        result = <div className="feed__item-text feed__item-text--buy">
                    Купил {parseFloat(arr[1])} {element.substr(-3, 3)} за {Math.abs(parseFloat(arr[0]).toFixed(2))}$
                </div>
    } else {
        result = <div className="feed__item-text feed__item-text--sell">
                    Продал {Math.abs(parseFloat(arr[1]))} {element.substr(-3, 3)} за {Math.abs(parseFloat(arr[0]).toFixed(2))}$
                </div>
    }

    return result;
}

export const walletNumTransform = data => {

    if (data !== undefined && data !== 0) {
        let str = String(data);
        let position = str.indexOf('.');
        
        if (position >= 0) {
            return  <Fragment>
                        <div className="score__item-whole">{str.substring(0, position + 1)}</div>
                        <div className="score__item-fraction">{str.substring(position + 1)}</div>
                    </Fragment>
        } 
    }

    return <Fragment>
                <div className="score__item-whole">{data}</div>
           </Fragment>
}