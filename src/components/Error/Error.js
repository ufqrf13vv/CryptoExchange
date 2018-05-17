import React, { Fragment } from 'react';

const Error = ({isError, errorText}) => {

    return (
        <Fragment>
            {isError && <span className="error">{errorText}</span>}
        </Fragment>
    )
};

export default Error;