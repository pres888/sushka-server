var fs = require('fs'),
    http = require('http'),
    WebSocket = require('ws');

var database = require('./database');

const dataServer = function(SECRET, bridge) {

    // HTTP Server to accept incomming Data Stream from hardware and resend values
    var dataServer = http.createServer(function(request, response) {
        // console.log(
        //     'DATA Connected: ' +
        //     request.socket.remoteAddress + ':' +
        //     request.socket.remotePort + ' ' +
        //     request.method + ' ' +
        //     request.url
        // );

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
            const params = sbody.match(/.+/g) || [];
            // Преобразуем данные в объект
            var payload = {};
            var series_payload = {};    // Для серий отдельный список
            params.forEach((line) => {
                if(!line.match('=')) return;
                const comps = line.split('=');
                if(!comps[0]) return;
                const k = comps.shift();
                const v = comps.join('=');
                // console.log("k", k, "v", v);
                if(k.startsWith('#')) {
                    console.log("Log field (TODO)", k.slice(1), v);
                    database.saveLog(hwid, k.slice(1), v);
                    payload[k.slice(1)] = v;
                } else if(k.startsWith('!')) {
                    // series_payload.push({k: k.slice(1), v});
                    series_payload[k.slice(1)] = v;
                } else if(k=="$start") {
                    database.startSeries(hwid, v);
                } else if(k == "$stop") {
                    database.stopSeries(hwid, v);
                } else {
                    payload[k] = v;
                }
            });

            // console.log(" >> POST(" + hwid + "):", params);

            if(Object.keys(series_payload).length > 0) {
                database.insertDataToSeries(hwid, series_payload);
            }

            // Отправим данные всем socket-клиентам
            // В ответ придет пакет для ответной отправки устройствам
            const resp = bridge.dataIncoming(hwid, payload)

            // Преобразуем в записи вида: имя=значение
            // .concat(abody).toString();
            let sresp = '';
            for (var k in resp) {
              if (resp.hasOwnProperty(k)) {
                  // console.log("    >> " + name + " size:", this.hwid2sockets[name].size);
                  sresp += k.toString() + '=' + resp[k].toString() + '\n';
              }
            }

            // const body = "hello sushka";
            response.writeHead(200, {
                "Content-Type": "text/plain",
                "Content-Length": Buffer.byteLength(sresp)
            });
            response.write(sresp);
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
