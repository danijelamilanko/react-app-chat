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

    componentDidMount() {
        const that = this;
        // Listen joined chat broadcast from the server via socket.io
        this.props.socket.on('joined-chat-broadcast-from-server', data => {
            that.props.onReceiveJoinedChatBroadcast(data.chatId, data.user, that.props.userId)
        });

        // Listen left chat broadcast from the server via socket.io
        this.props.socket.on('left-chat-broadcast-from-server', data => {
            that.props.onReceiveLeftChatBroadcast(data.chatId, that.props.activeChatId, data.userId, that.props.userId)
        });

        // Listen new message added broadcast from the server via socket.io
        this.props.socket.on('new-message-added-broadcast-from-server', message => {
            that.props.onReceiveMessageAddedBroadcast(message, that.props.chats, that.props.userId, that.props.activeChatId)
        });

        this.props.socket.onclose = () => {
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

    tabClickedHandler = (chatId) => {
        this.props.onLeaveChat(this.props.activeChatId, this.props.userId, this.props.socket);
        this.props.onJoinChat(chatId, this.props.userId, this.props.socket);
        this.props.onSetActiveChat(chatId);
        this.props.onGetChatMessages(chatId);
    };

    render() {
        let tabs = [];
        let messages = [];
        let users = [];
        if (this.props.chats && this.props.chats.length > 0) {
            if (this.props.activeChatId) {
                users = this.props.chats.filter(chat => chat._id === this.props.activeChatId)[0].members;
                tabs = this.props.chats.map(chat => {
                    let newChat = Object.assign({}, chat);
                    delete newChat['members'];
                    return newChat;
                });
            }
        }
        if (Object.keys(this.props.messages).length > 0 && this.props.activeChatId) {
            if (this.props.messages.hasOwnProperty(this.props.activeChatId)) {
                messages = this.props.messages[this.props.activeChatId];
            }
        }
        return (
            <div className={classes.Chat}>
                <div className={classes.ChatMessages}>
                    <Tabs tabs={tabs} activeChatId={this.props.activeChatId} tabClicked={this.tabClickedHandler.bind(this)}/>
                    <Messages messages={messages}/>
                    <MessageInput activeChatId={this.props.activeChatId} userName={this.props.userName} messageSend={this.props.messageAddHandler}/>
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
        messageAddHandler: (messageBody, chatId, socket) => dispatch(actions.addMessage(messageBody, chatId, socket)),
        onReceiveMessageAddedBroadcast: (message, chats, currentUserId, activeChatId) => {
            const chat = chats.find(c => {
                return c._id === message.chat
            });
            if (chat !== undefined) {
                if (chat.members.some(member => {
                    return member._id === currentUserId;
                })) {
                    if (activeChatId === message.chat) {
                        dispatch(actions.addMessageSuccess(message))
                    }
                }
            }
        },
        onReceiveJoinedChatBroadcast: (chatId, user, currentUserId) => {
            if (currentUserId !== user._id) {
                dispatch(actions.joinChatSuccess(chatId, user));
            }
        },
        onReceiveLeftChatBroadcast: (chatId, activeChatId, userId, currentUserId) => {
            if (currentUserId !== userId) {
                dispatch(actions.leaveChatSuccess(chatId, userId));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWithSocket);
