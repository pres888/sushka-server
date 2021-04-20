
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

        // this.sockets.hwid2sockets.add(socket);

        // var hwid2sockets =

        // console.log(">>  size:", this.hwid2sockets[hwid].size);


        // _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
        //   console.log(key);
        // });

        // for (let item of mySet) console.log(">>    ", item);
        this.dump()

    }
    wsDisconnect(socket, hwid) {
        console.log("Bridge:wsDisconnect", hwid);
        // this.sockets.hwid2sockets.delete(socket);
        this.hwid2sockets[hwid] = this.hwid2sockets[hwid] || new Set();
        this.hwid2sockets[hwid].delete(socket);
        this.dump()
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
