import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: [],
    error: false
};

const addUser = (state, action) => {
    return updateObject(state, {
        users: state.users.concat([
            {
                id: action.id,
                name: action.name
            }
        ]),
        error: false
    });
};

const setUsers = (state, action) => {
    return updateObject(state, {
        users: action.users,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return addUser(state, action);
        case actionTypes.USERS_LIST:
            return setUsers(state, action);
        default:
            return state;
    }
};

export default reducer;
