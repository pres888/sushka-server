// Example:
// node server yoursecret 8080 8081 8082

var fs = require('fs'),
    http = require('http'),
    WebSocket = require('ws');

var webServer = require('./src-server/webServer');
var socketServer_ = require('./src-server/socketServer');
var dataServer_ = require('./src-server/dataServer');
const Bridge = require('./src-server/bridge');



// TODO: Это условие никогда не будет выполнено, возможно параметр SECRET стоит сделать обязательным
if (process.argv.length < 2) {
    console.log(
        'Usage: \n' +
        'node server.js [<secret> <web-port> <data-port> <websocket-port>]'
    );
    process.exit();
}

// TODO: В продакшене нужно через SECRET реализовать цифровую подпись

var SECRET = process.argv[2] || "default-token",
    WEB_PORT = process.argv[3] || 8080,
    DATA_PORT = process.argv[4] || 8081,
    WEBSOCKET_PORT = process.argv[5] || 8082,
    RECORD_STREAM = false;


// Свяжем все серверы (TBD)
const bridge = new Bridge();
console.log("bridge", bridge);


// TODO: Не самое элегантное решение
const socketServer = socketServer_(WEBSOCKET_PORT, bridge);

const dataServer = dataServer_(SECRET, bridge);
// Keep the socket open for data-streaming (not now)
// dataServer.headersTimeout = 0;
// Наоборот, не дадим занимать канал.
dataServer.keepAliveTimeout = 1000;
dataServer.on('error', function(err) {
    console.log("dataServer error", err.stack);
});
dataServer.on('connection', function(socket) {
    socket.setTimeout(1500);
    console.log("dataServer connection");
});
dataServer.listen(DATA_PORT);

webServer.listen(WEB_PORT);




console.log('Awaiting Web connections on ws://127.0.0.1:' + WEB_PORT + '/');
console.log('Listening for incomming Data-Stream on http://127.0.0.1:' + DATA_PORT + '/' + SECRET);
console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + WEBSOCKET_PORT + '/');
