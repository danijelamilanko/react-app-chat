import * as actionTypes from '../store/actions/actionTypes'
import { messageReceived } from '../store/actions'

const setupSocket = (dispatch, username) => {
    const socket = new WebSocket('ws://localhost:8989');
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case actionTypes.SEND_MESSAGE:
                dispatch(messageReceived(data.chatName, data.message, data.author));
                break;
            default:
                break;
        }
    };

    return socket;
};

export default setupSocket;
