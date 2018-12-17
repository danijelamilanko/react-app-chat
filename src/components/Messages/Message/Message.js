import React from 'react';

const message = (props) => (
    <p>
        <i>{props.author}</i>: {props.message}
    </p>
);

export default message;
