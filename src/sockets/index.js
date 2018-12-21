import * as actionTypes from '../store/actions/actionTypes';
import { messageReceived, setUsers, addUser } from '../store/actions';

const setupSocket = (dispatch) => {
    const socket = new WebSocket('ws://localhost:8989');
    socket.onopen = () => {
        socket.send(JSON.stringify({
            type: actionTypes.ADD_USER,
            name: localStorage.getItem("userName")
        }))
    };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case actionTypes.SEND_MESSAGE:
                dispatch(messageReceived(data.chatName, data.message, data.userName));
                break;
            case actionTypes.ADD_USER:
                dispatch(addUser(data.name));
                break;
            case actionTypes.USERS_LIST:
                dispatch(setUsers(data.users));
                break;
            default:
                break;
        }
    };

    return socket;
};

export default setupSocket;
