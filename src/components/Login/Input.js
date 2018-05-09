import React, { Fragment } from 'react';

const Input = ({ input, type, meta, placeholder }) => (
    <Fragment>
        <input className="input-text" type={type} placeholder={placeholder} {...input} />
    </Fragment>
);

export default Input;