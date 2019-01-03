import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

export function* getChetsSaga(action) {
    yield put(actions.getChatsStart());
    try {
        const response = yield axios.get(`/api/chats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.getChatsSuccess(response.data.data.chats)
        );
    } catch (error) {
    }
}

export function* joinChatSaga(action) {
    yield put(actions.joinChatStart());
    try {
        const response = yield axios.post(`/api/chats/${action.payload.chatId}/members`, {
            newMemberUserId: action.payload.userId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.joinChatSuccess(action.payload.chatId, response.data.data.user)
        );
        yield put(
            actions.addMessageSuccess(response.data.data.newMessage)
        );
        // Tell the server that a new message was added via socket.io
        action.payload.socket.emit('joined-chat', { chatId: action.payload.chatId, userId: action.payload.userId});
        // Tell the server that a new message was added via socket.io
        action.payload.socket.emit('new-message-added', response.data.data.newMessage)
    } catch (error) {
    }
}

export function* leaveChatSaga(action) {
    yield put(actions.leaveChatStart());
    try {
        const response = yield axios.delete(`/api/chats/${action.payload.chatId}/members/${action.payload.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.leaveChatSuccess(response.data.chats)
        );
        // Tell the server that a new message was added via socket.io
        action.payload.socket.emit('left-chat', { chatId: action.payload.chatId, userId: action.payload.userId});
    } catch (error) {
    }
}
