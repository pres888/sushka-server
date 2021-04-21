const fs = require('fs'),
    http = require('http'),
    WebSocket = require('ws');

const url = require('url');

// Websocket Server

const socketServer = function(port, bridge) {
    const socketServer = new WebSocket.Server({
        port: port,
        perMessageDeflate: false
    });
    socketServer.connectionCount = 0;
    socketServer.on('connection', function(socket, upgradeReq) {
        socketServer.connectionCount++;

        const request = (upgradeReq || socket.upgradeReq);
        // const pathname = url.parse(request.url).pathname;

        const params = request.url.substr(1).split('/');
        const hwid = params[0] || 'unknown';

        console.log(
            'New WebSocket Connection: ',
            (upgradeReq || socket.upgradeReq).socket.remoteAddress,
            (upgradeReq || socket.upgradeReq).headers['user-agent'],
            params,
            '(' + socketServer.connectionCount + ' total)'
        );

        bridge.wsConnect(socket, hwid);

        socket.on('close', function(code, message) {
            socketServer.connectionCount--;
            bridge.wsDisconnect(socket, hwid);
            console.log(
                'Disconnected WebSocket (' + socketServer.connectionCount + ' total)'
            );
        });

        socket.on('message', function(data){
            console.log("socketServer:message", data);
            try {
                bridge.messageFromSocket(hwid, JSON.parse(data))
            } catch (e) {
                console.log("Error parsing JSON", data)
            }
        });
    });
    socketServer.broadcast = function(data) {
        socketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log("Resend frame (TBD)");
                client.send(data);
            }
        });
    };
    return socketServer;
}


module.exports = socketServer;
