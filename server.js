const http = require('http');
const app = require('./server/app');

const port = process.env.PORT;
const server = http.createServer(app);

const io = require('socket.io')(server, {
    path: '/chat/socket.io'
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('joined-chat', data => {
        console.log('joined-chat');
        socket.broadcast.emit('joined-chat-broadcast-from-server', data);
    });

    socket.on('left-chat', data => {
        console.log('left-chat');
        socket.broadcast.emit('left-chat-broadcast-from-server', data);
    });

    socket.on('new-message-added', message => {
        console.log('new-message-added');
        socket.broadcast.emit('new-message-added-broadcast-from-server', message);
    });
});

server.listen(port);
