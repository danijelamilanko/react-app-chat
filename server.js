const http = require('http');
const app = require('./server/app');

const port = process.env.PORT || 3001;
const server = http.createServer(app);

const io = require('socket.io')(server, {
    path: '/chat/socket.io'
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('joined-channel', data => {
        socket.broadcast.emit('joined-channel-broadcast-from-server', data);
    });

    socket.on('left-channel', data => {
        socket.broadcast.emit('left-channel-broadcast-from-server', data);
    });

    socket.on('new-message-added', message => {
        socket.broadcast.emit('new-message-added-broadcast-from-server', message);
    });

    socket.on('message-deleted', messageId => {
        socket.broadcast.emit('message-deleted-broadcast-from-server', messageId);
    });
});

server.listen(port, function () {
    console.log('API running on localhost:' + port);
});
