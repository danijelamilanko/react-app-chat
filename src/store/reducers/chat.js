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
            return {
                ...state,
                activeChatId: action.payload.chatId
            }
        }
        case actionTypes.LEAVE_CHAT_SUCCESS: {
            const clonedChats = state.chats.map(chat => {
                return {
                    ...chat,
                    members: chat._id !== action.payload.chatId ? [...chat.members] : chat.members.filter(member => {
                        return member._id !== action.payload.userId
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
