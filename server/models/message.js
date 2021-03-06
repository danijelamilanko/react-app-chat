const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
});

module.exports = mongoose.model('Message', schema);
