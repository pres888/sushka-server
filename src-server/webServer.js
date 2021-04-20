var fs = require('fs'),
    http = require('http');

// HTTP Server to accept incomming WEB from users
const webServer = http.createServer(function(request, response) {
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
});

module.exports = webServer;
