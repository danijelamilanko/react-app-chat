import React from 'react';

import classes from './MessageInput.module.css';
import Button from '../UI/Button/Button';

const messageInput = (props) => {
    return (
        <div className={classes.MessageInput}>
            <Button btnType="Success" clicked={props.messageSend}>SEND</Button>
        </div>
    );
};

export default messageInput;