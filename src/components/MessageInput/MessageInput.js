import React, { Component } from 'react';

import classes from './MessageInput.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class MessageInput extends Component {
    state = {
        messageInputForm: {
            message: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter text'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            }
        }
    };

    messageInputChanged = (newValue) => {
        const updatedMessageForm = {
            ...this.state.messageInputForm
        };
        const updatedFormElement = {
            ...updatedMessageForm['message']
        };
        updatedFormElement.value = newValue;
        updatedFormElement.touched = true;
        updatedMessageForm['message'] = updatedFormElement;

        this.setState({messageInputForm: updatedMessageForm});
    };

    onKeyPressHandler = (event) => {
        if (event.key === 'Enter') {
            this.props.messageSend(event, this.state.messageInputForm.message.value);
            this.messageInputChanged('');
        }
    };

    render () {
        return (
            <form className={classes.MessageInput}
                  onSubmit={(event) => {
                      this.props.messageSend(event, this.state.messageInputForm.message.value);
                      this.messageInputChanged('');
                  }}>
                <Input
                    elementType={this.state.messageInputForm.message.elementType}
                    elementConfig={this.state.messageInputForm.message.elementConfig}
                    value={this.state.messageInputForm.message.value}
                    invalid={!this.state.messageInputForm.message.valid}
                    shouldValidate={this.state.messageInputForm.message.validation}
                    touched={this.state.messageInputForm.message.touched}
                    keyPressed={(event) => this.onKeyPressHandler(event)}
                    changed={(event) => this.messageInputChanged(event.target.value)}/>
                <Button btnType="Success">SEND</Button>
            </form>
        );
    };
};

export default MessageInput;
