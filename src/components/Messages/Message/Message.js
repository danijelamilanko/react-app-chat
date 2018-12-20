import React from 'react';

const message = (props) => (
    <p>
        <i>{props.userName}</i>: {props.message}
    </p>
);

export default message;
