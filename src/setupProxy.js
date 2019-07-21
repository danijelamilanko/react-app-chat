const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(proxy("/chat/socket.io", {target: "http://localhost:3002", ws: true}))
};
