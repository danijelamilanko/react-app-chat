import * as actionTypes from './actionTypes';

let nextMessageId = 0;

export const sendMessage = (chatName, message, userName) => {
    return {
        type: actionTypes.SEND_MESSAGE,
        chatName: chatName,
        message: message,
        id: nextMessageId++,
        userName: userName
    };
};

export const messageReceived = (chatName, message, userName) => {
    return {
        type: actionTypes.MESSAGE_RECEIVED,
        chatName: chatName,
        message: message,
        id: nextMessageId++,
        userName: userName
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
