const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8989 });

const users = [];

const broadcast = (data, ws) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
            client.send(JSON.stringify(data))
        }
    })
};

wss.on('connection', (ws) => {
    let index;
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(message);
        switch (data.type) {
            case 'ADD_USER': {
                index = users.length;
                users.push({ name: data.name, id: index + 1 });
                console.log(users);
                ws.send(JSON.stringify({
                    type: 'USERS_LIST',
                    users
                }));
                broadcast({
                    type: 'USERS_LIST',
                    users
                }, ws);
                break
            }
            case 'SEND_MESSAGE':
                broadcast({
                    type: 'SEND_MESSAGE',
                    chatName: data.chatName,
                    message: data.message,
                    userName: data.userName
                }, ws);
                break;
            default:
                break
        }
    });

    ws.on('close', () => {
        users.splice(index, 1);
        broadcast({
            type: 'USERS_LIST',
            users
        }, ws)
    })
});
