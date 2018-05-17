import React, { Fragment } from 'react';
import Spinner from 'react-svg-spinner';

const Loader = ({isLoading}) => {

    return (
        <Fragment>
            {isLoading && <Spinner size="64px" color="fuchsia" gap={5} />}
        </Fragment>
    )
};

export default Loader;