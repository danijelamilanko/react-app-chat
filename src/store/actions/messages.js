import * as actionTypes from './actionTypes';

let nextMessageId = 0;

export const sendMessage = (chatName, message, author) => {
    return {
        type: actionTypes.SEND_MESSAGE,
        chatName: chatName,
        message: message,
        id: nextMessageId++,
        author: author
    };
};

export const messageReceived = (chatName, message, author) => {
    return {
        type: actionTypes.MESSAGE_RECEIVED,
        chatName: chatName,
        message: message,
        id: nextMessageId++,
        author: author
    };
};

export const setMessages = (messages) => {
    return {
        type: actionTypes.SET_MESSAGES,
        messages: messages
    };
};

export const fetchMessagesFailed = () => {
    return {
        type: actionTypes.FETCH_MESSAGES_FAILED
    };
};

export const initMessages = () => {
    return {
        type: actionTypes.INIT_MESSAGES
    };
};
