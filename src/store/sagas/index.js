import { takeEvery, put, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from "./auth";
import * as actions from "../actions";
import axios from "../../axios-messages";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

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
