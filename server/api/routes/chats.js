const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

// Include models
const Chat = require('../../models/chat');
const Message = require('../../models/message');
const User = require('../../models/user');

router.get('/', checkAuth, (req, res, next) => {
    Chat.find()
        .populate({ path: 'members' })
        .exec()
        .then(chats => {
            return res.status(200).json({
                status: 'success',
                data: {
                    chats: chats,
                    user: {
                        _id: req.userData._id,
                        firstName: req.userData.firstName,
                        lastName: req.userData.lastName,
                        email: req.userData.email,
                        role: req.userData.role
                    }
                }
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later'
            })
        });
});

router.post('/:chatId/members', checkAuth, (req, res, next) => {
    let thisChat = null;
    let newMessage = null;
    let memberUser = null;

    Chat.findById(req.params.chatId).exec()
        .then(chat => {
            // TODO: check if user has already been a member of thie chat
            thisChat = chat;

            chat.members.push(req.body.newMemberUserId);
            return chat.save();
        })
        .then(result => {
            return User.findById(req.body.newMemberUserId).exec();
        })
        .then(user => {
            memberUser = user;

            const message = new Message();
            message._id = new mongoose.Types.ObjectId();
            message.body = `joined #${thisChat.name}`;
            message.chat = req.params.chatId;
            message.createdAt = new Date();
            message.createdBy = req.body.newMemberUserId;

            newMessage = message;

            return message.save();
        })
        .then(result => {
            return res.status(200).json({
                status: 'success',
                code: '200',
                data: {
                    newMessage: {
                        _id: newMessage._id,
                        body: newMessage.body,
                        createdAt: newMessage.createdAt,
                        chat: newMessage.chat,
                        createdBy: {
                            _id: memberUser._id,
                            firstName: memberUser.firstName,
                            lastName: memberUser.lastName,
                            email: memberUser.email,
                            role: memberUser.role
                        }
                    },
                    user: memberUser
                }
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later.'
            });
        });
});

router.delete('/:chatId/members/:memberId', checkAuth, (req, res, next) => {
    let thisChat = null;
    let newMessage = null;
    let memberUser = null;

    Chat.findById(req.params.chatId).exec()
        .then(chat => {
            // TODO: check if the user is not a member of this chat

            thisChat = chat;

            const updatedChatMembers = chat.members.filter(member => {
                return member.toString() !== req.params.memberId;
            });

            chat.members = updatedChatMembers;
            return chat.save();
        })
        .then(result => {
            return User.findById(req.params.memberId).exec();
        })
        .then(user => {
            memberUser = user;

            const message = new Message();
            message._id = new mongoose.Types.ObjectId();
            message.body = `left #${thisChat.name}`;
            message.chat = req.params.chatId;

            newMessage = message;

            return newMessage.save();
        })
        .then(result => {
            return res.status(200).json({
                status: 'success',
                code: '200',
                data: {
                    newMessage: {
                        _id: newMessage._id,
                        body: newMessage.body,
                        chat: newMessage.chat
                    }
                }
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later.'
            });
        });
});

module.exports = router;
