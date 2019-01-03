import * as actionTypes from '../actions/actionTypes';

const initialState = {
    chats: null,
    activeChatId: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_CHATS_SUCCESS: {
            return {
                ...state,
                chats: action.payload.chats
            }
        }
        case actionTypes.JOIN_CHAT_SUCCESS: {
            const clonedChats = state.chats.map(chat => {
                return {
                    ...chat,
                    members: chat._id === action.payload.chatId ? [...chat.members, action.payload.user] : [...chat.members]
                }
            });
            return {
                ...state,
                chats: clonedChats
            }
        }
        case actionTypes.SET_ACTIVE_CHAT: {
            let clonedChats = null;
            if (state.chats !== null) {
                clonedChats = state.chats.map(chat => {
                    return {
                        ...chat,
                        members: [...chat.members]
                    }
                })
            }

            return {
                chats: clonedChats,
                activeChatId: action.payload.chatId
            }
        }
        case actionTypes.LEAVE_CHAT_SUCCESS: {
            const clonedChats = state.chats.map(chat => {
                return {
                    ...chat,
                    members: chat._id !== action.payload.chatId ? [...chat.members] : chat.members.filter(member => {
                        return member !== action.payload.userId
                    })
                };
            });
            return {
                ...state,
                chats: clonedChats
            }
        }
        default:
            return state
    }
};

export default reducer;
