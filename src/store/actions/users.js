import * as actionTypes from './actionTypes';

let nextUserId = 0;

export const addUser = (name) => {
    return {
        type: actionTypes.ADD_USER,
        name: name,
        id: nextUserId++,
    };
};

export const setUsers = (users) => {
    return {
        type: actionTypes.USERS_LIST,
        users: users
    };
};
