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
});
