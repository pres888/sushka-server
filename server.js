// Example:
// node server yoursecret 8080 8081 8082

var fs = require('fs'),
    http = require('http'),
    WebSocket = require('ws');

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

// Websocket Server
var socketServer = new WebSocket.Server({
    port: WEBSOCKET_PORT,
    perMessageDeflate: false
});
socketServer.connectionCount = 0;
socketServer.on('connection', function(socket, upgradeReq) {
    socketServer.connectionCount++;
    console.log(
        'New WebSocket Connection: ',
        (upgradeReq || socket.upgradeReq).socket.remoteAddress,
        (upgradeReq || socket.upgradeReq).headers['user-agent'],
        '(' + socketServer.connectionCount + ' total)'
    );
    socket.on('close', function(code, message) {
        socketServer.connectionCount--;
        console.log(
            'Disconnected WebSocket (' + socketServer.connectionCount + ' total)'
        );
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

// HTTP Server to accept incomming Data Stream from hardware and resend values
var streamServer = http.createServer(function(request, response) {
    console.log(
        'DATA Connected: ' +
        request.socket.remoteAddress + ':' +
        request.socket.remotePort + ' ' +
        request.method + ' ' +
        request.url
    );

    var params = request.url.substr(1).split('/');

    if (params[0] !== SECRET) {
        console.log(
            'Failed Data-Stream Connection: ' + request.socket.remoteAddress + ':' +
            request.socket.remotePort + ' - wrong secret.'
        );
        response.writeHead(401, {
            'Content-Type': 'text/plain'
        });
        response.end('Wrong TOKEN.\n');
        // response.end();
        return;
    }

    const hwid = params[1] || 'unknown';

    let abody = [];

    request.on('data', (chunk) => {
        abody.push(chunk);
    });
    request.on('end', () => {
        const sbody = Buffer.concat(abody).toString();
        // at this point, `sbody` has the entire request body stored in it as a string

        if (request.method != "POST") {
            response.writeHead(405, {
                'Content-Type': 'text/plain'
            });
            response.end('Only POST method allowed.\n');
            return;
        }

        // TODO: Разобьем параметры
        // const params = sbody.split(/\r?\n/);
        const params = sbody.match(/.+/g);
        console.log(" >> POST(" + hwid + "):", params);




        // const body = "hello sushka";
        response.writeHead(200, {
            "Content-Type": "text/plain",
            "Content-Length": Buffer.byteLength(sbody)
        });
        response.write(sbody);
        response.end();

    });


    // this.close();

    // // response.connection.setTimeout(0);
    // console.log(
    // 	'Data-Stream Connected: ' +
    // 	request.socket.remoteAddress + ':' +
    // 	request.socket.remotePort
    // );
    // request.on('data', function(data){
    // 	console.log("TBD Data-stream: on('data')", data);
    // 	// socketServer.broadcast(data);
    // 	if (request.socket.recording) {
    // 		request.socket.recording.write(data);
    // 	}
    //     response.end();
    // });
    // request.on('end',function(){
    // 	console.log('close');
    // 	if (request.socket.recording) {
    // 		request.socket.recording.close();
    // 	}
    // });
    //
    // // Record the stream to a local file?
    // if (RECORD_STREAM) {
    // 	var path = 'recordings/' + Date.now() + '.bin';
    // 	request.socket.recording = fs.createWriteStream(path);
    // }
})
// Keep the socket open for data-streaming
// streamServer.headersTimeout = 0;
streamServer.listen(DATA_PORT);


// HTTP Server to accept incomming WEB from users
var webServer = http.createServer(function(request, response) {
    console.log(
        'WEB Connected: ' +
        request.socket.remoteAddress + ':' +
        request.socket.remotePort + ' ' +
        request.method + ' ' +
        request.url
    );

    function file(path) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(fs.readFileSync('dist/' + path, 'utf8'));
    }

    // TODO: На каком-нибудь express это можно сделать немного проще, но у нас мало файлов в проекте, так что можно обойтись.
    switch (request.url) {
        case '/':
        case '/index.html':
            file('index.html');
            break

        case '/main.bundle.js':
            file('main.bundle.js');
            break

        default:
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            response.end('Not found');
    }

    // const body = "hello sushka";
    // response.writeHead(200, {
    // 	"Content-Type": "text/plain",
    // 	"Content-Length": Buffer.byteLength(body)
    // });
    // response.write(body);
    // response.end();
    // this.close();
})
webServer.listen(WEB_PORT);





console.log('Awaiting Web connections on ws://127.0.0.1:' + WEB_PORT + '/');
console.log('Listening for incomming Data-Stream on http://127.0.0.1:' + DATA_PORT + '/' + SECRET);
console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + WEBSOCKET_PORT + '/');
