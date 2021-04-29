
const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json', {syncOnWrite: true});

// Класс обеспечивает связку data-сервера c socket-сервером

class Bridge {

    constructor() {
        console.log("Bridge.constructor", this);
        // this.socketServer = socketServer;
        // this.dataServer = dataServer;
        // this.sockets = {
        //     hwid2sockets : new Set()
        // };

        // Связки hwid -> set of sockets
        this.hwid2sockets = {};
    }

    wsConnect(socket, hwid) {
        console.log("Bridge:wsConnect", hwid);
        // Сохраним связку HWID -> socket
        this.hwid2sockets[hwid] = this.hwid2sockets[hwid] || new Set();
        this.hwid2sockets[hwid].add(socket);


        // Отправим состояние.
        const state_key='state_' + hwid;
        var state = db.get(state_key) || {};
        socket.send(JSON.stringify(state));

        // this.sockets.hwid2sockets.add(socket);

        // var hwid2sockets =

        // console.log(">>  size:", this.hwid2sockets[hwid].size);


        // _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
        //   console.log(key);
        // });

        // for (let item of mySet) console.log(">>    ", item);
        // this.dump()

    }
    wsDisconnect(socket, hwid) {
        console.log("Bridge:wsDisconnect", hwid);
        // this.sockets.hwid2sockets.delete(socket);
        this.hwid2sockets[hwid] = this.hwid2sockets[hwid] || new Set();
        this.hwid2sockets[hwid].delete(socket);
        // this.dump()
    }

    dataIncoming(hwid, payload) {
        // Пришли данные от устройств
        console.log("Bridge:dataIncoming", hwid, payload);
        // TODO:
        // 1. Отправим данные всем подключенным socket-клиентам
        if(this.hwid2sockets.hasOwnProperty(hwid)) {
            for (let socket of this.hwid2sockets[hwid]) {
                // TODO: Возможно как-то можно проверить что сокет еще открыт
                // Или просто обернуть в try catch
                try {
                    socket.send(JSON.stringify(payload))
                } catch (e) {
                    console.log(">>  error resending", e);
                }
            }
        }
        // 2. Сохраним данные чтобы отправлять socket-клиентам, которые подлючатся позже
        // TODO: Возможно это нужно сделать перед п1 и отправлять интегрированное состояние
        const state_key='state_' + hwid;
        var old_state = db.get(state_key) || {};
        for (var k in payload) {
            if (payload.hasOwnProperty(k)) {
                old_state[k] = payload[k];
            }
        }
        db.set(state_key, old_state);

        // 3. Вернем пакет данных команд, если такой есть
        const key = "cmd_" + hwid;
        const resp = db.get(key) || {};
        // TODO: Не самое надежное решение. В идеале, надобы реализовать подтверждение получения от устройства
        db.delete(key);
        return resp;
    }

    messageFromSocket(hwid, payload) {
        // Данные от WEB-клиента
        console.log("Bridge:messageFromSocket", hwid, payload);
        if(payload["cmd"]) {
            switch(payload["cmd"]) {
                case "cmd":
                    // TODO: Сохраняем пакет для отправки устройству при следующем сеансе связи
                    // Команды добавляются к тем что уже в очереди.
                    const key = "cmd_" + hwid;
                    const name = payload["name"] || "undefined";
                    const value = payload["value"] || "undefined";
                    var old_cmd = db.get(key) || {};
                    old_cmd[name] = value;
                    db.set(key, old_cmd);

                    console.log("Bridge:Message queue", hwid, old_cmd);

                    break;

            }
        }
    }

    dump() {
        console.log("Bridge:dump");
        console.log("  >> hwid2sockets:");
        for (var name in this.hwid2sockets) {
          if (this.hwid2sockets.hasOwnProperty(name)) {
              console.log("    >> " + name + " size:", this.hwid2sockets[name].size);
          }
        }

    }

}

module.exports = Bridge;
