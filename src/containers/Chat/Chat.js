import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from '../../components/Tabs/Tabs';
import Messages from "../../components/Messages/Messages";
import classes from './Chat.module.css';

import * as actions from "../../store/actions";
import MessageInput from "../../components/MessageInput/MessageInput";
import Users from "../../components/Users/Users";

import SocketContext from '../../socket-context';

class Chat extends Component {

    setChat = false;
    onExit = () => {
        this.props.onLeaveChat(this.props.activeChatId, this.props.userId, this.props.socket);
    };

    componentWillUnmount() {
        this.onExit();
    }

    componentDidMount() {
        // Listen joined chat broadcast from the server via socket.io
        this.props.socket.on('joined-chat-broadcast-from-server', data => {
            this.props.onReceiveJoinedChatBroadcast(data.chatId, data.userId, this.props.userId)
        });

        // Listen left chat broadcast from the server via socket.io
        this.props.socket.on('left-chat-broadcast-from-server', data => {
            this.props.onReceiveLeftChatBroadcast(data.chatId, data.userId, this.props.userId)
        });

        // Listen new message added broadcast from the server via socket.io
        this.props.socket.on('new-message-added-broadcast-from-server', message => {
            this.props.onReceiveMessageAddedBroadcast(message, this.props.chats, this.props.userId, this.props.activeChatId)
        });

        this.props.socket.onclose = () => {
            this.onExit();
        };
        this.props.onGetChats();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.chats && nextProps.chats.length > 0) {
            if (!nextProps.activeChatId) {
                nextProps.onSetActiveChat(nextProps.chats[0]._id);
            }
        }
    }

    componentDidUpdate() {
        if (this.props.activeChatId && !this.setChat) {
            this.setChat = true;
            this.props.onJoinChat(this.props.activeChatId, this.props.userId, this.props.socket);
            this.props.onGetChatMessages(this.props.activeChatId);
        }
    }

    tabSwitchHandler = (chatId) => {
        this.props.onJoinChat(chatId, this.props.socket);
    };

    render() {
        let tabs = [];
        let messages = [];
        let users = [];
        if (this.props.chats && this.props.chats.length > 0) {
            if (this.props.activeChatId) {
                users = this.props.chats[0].members;
                tabs = this.props.chats.map(chat => chat.name);
            }
        }
        if (Object.keys(this.props.messages).length > 0 && this.props.activeChatId) {
            messages = this.props.messages[this.props.activeChatId];
        }
        return (
            <div className={classes.Chat}>
                <div className={classes.ChatMessages}>
                    <Tabs tabs={tabs} activeChatId={this.props.activeChatId} tabSwitched={this.tabSwitchHandler}/>
                    <Messages messages={messages}/>
                    <MessageInput activeChatId={this.props.activeChatId} userName={this.props.userName} messageSend={this.props.onMessageAdd}/>
                </div>
                <div className={classes.ChatUsers}>
                    <Users users={users}></Users>
                </div>
            </div>
        );
    }
}

const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Chat {...props} socket={socket} />}
    </SocketContext.Consumer>
);

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        messages: state.message.messages,
        userId: state.auth.userId,
        chats: state.chat.chats,
        activeChatId: state.chat.activeChatId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveChat: chatId => dispatch(actions.setActiveChat(chatId)),
        onGetChatMessages: (chatId) => dispatch(actions.getChatMessages(chatId)),
        onGetChats: () => dispatch(actions.getChats()),
        onJoinChat: (chatId, userId, socket) => dispatch(actions.joinChat(chatId, userId, socket)),
        onLeaveChat: (chatId, userId, socket) => dispatch(actions.leaveChat(chatId, userId, socket)),
        onMessageAdd: (messageBody, chatId, socket) => dispatch(actions.addMessage(messageBody, chatId, socket)),
        onReceiveMessageAddedBroadcast: (message, chats, currentUserId, activeChatId) => {
            const chat = chats.find(c => {
                return c._id === message.chat
            });
            if (chat !== undefined) {
                if (chat.members.indexOf(currentUserId) >= 0) {
                    if (activeChatId === message.chat) {
                        dispatch(actions.addMessageSuccess(message))
                    }
                }
            }
        },
        onReceiveJoinedChatBroadcast: (chatId, userId, currentUserId) => {
            if (currentUserId === userId) {
                dispatch(actions.joinChatSuccess(chatId, userId));
            }
        },
        onReceiveLeftChatBroadcast: (chatId, userId, currentUserId) => {
            if (currentUserId === userId) {
                dispatch(actions.leaveChatSuccess(chatId, userId));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWithSocket);
