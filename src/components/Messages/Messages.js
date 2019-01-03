import React, { Component } from 'react';

import classes from './Messages.module.css';
import Message from './Message/Message';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.messagesRef = React.createRef();
    }

    componentDidMount() {
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight - this.messagesRef.current.clientHeight;
    }

    componentDidUpdate(prevProps) {
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight - this.messagesRef.current.clientHeight;
    }

    render() {
        return (
            <div ref={this.messagesRef} className={classes.Messages}>
                {this.props.messages.map(message => (
                    <Message
                        key={message._id}
                        {...message}
                    />
                ))}
            </div>
        );
    }
}

export default Messages;
