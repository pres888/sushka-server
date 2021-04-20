var fs = require('fs'),
    http = require('http'),
    WebSocket = require('ws');


const dataServer = function(SECRET, bridge) {

    // HTTP Server to accept incomming Data Stream from hardware and resend values
    var dataServer = http.createServer(function(request, response) {
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
            // Преобразуем данные в объект
            var payload = {};
            params.forEach((item) => {
                var [k, v] = item.split(' ');
                if(v == undefined) return;
                console.log("k", k, "v", v);
                payload[k] = v;
            });

            console.log(" >> POST(" + hwid + "):", params);


            // Отправим данные всем socket-клиентам
            bridge.dataIncoming(hwid, payload)


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
    });
    return dataServer;
}

module.exports = dataServer;
