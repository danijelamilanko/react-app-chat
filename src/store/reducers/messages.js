import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    messages: [],
    error: false
};

const addMessage = (state, action) => {
    return updateObject(state, {
        messages: state.messages.concat([
            {
                id: action.id,
                message: action.message,
                userName: action.userName,
                chatName: action.chatName
            }
        ]),
        error: false
    });
};

const setMessages = (state, action) => {
    return updateObject(state, {
        messages: state.messages,
        error: false
    });
};

const fetchMessagesFailed = (state, action) => {
    return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_MESSAGE:
            return addMessage(state, action);
        case actionTypes.MESSAGE_RECEIVED:
            return addMessage(state, action);
        case actionTypes.SET_MESSAGES:
            return setMessages(state, action);
        case actionTypes.FETCH_MESSAGES_FAILED:
            return fetchMessagesFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
