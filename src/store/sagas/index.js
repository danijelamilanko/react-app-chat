import { takeEvery, put } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import * as actions from "../actions";
import axios from "../../axios-messages";

export function* watchMessages(params) {
    yield takeEvery(actionTypes.SEND_MESSAGE, (action) => {
        action.author = params.username;
        params.socket.send(JSON.stringify(action));
    });
    yield takeEvery(actionTypes.INIT_MESSAGES, function* (action) {
        try {
            const response = yield axios.get(
                "https://react-app-chat.firebaseio.com/messages.json"
            );
            yield put(actions.setMessages(response.data));
        } catch (error) {
            yield put(actions.fetchMessagesFailed());
        }
    });
}
