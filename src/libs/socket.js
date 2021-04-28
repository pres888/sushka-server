// Простейшая реализация WebSocket
// TODO: Возможно стоит взять связку socket.io + socketio-client

let socket;

export default function open(url, hwid, replacePage) {
    const path = url + "?hwid=" + hwid;
    console.log("WS: open", path);
    socket = new WebSocket(path);
    socket.onopen = () => {
        // console.log("(TBD) onopen");
        connect_state.classList.remove("show");
        // app.ports.websocketOpened.send(true);
    }
    socket.onmessage = message => {
        // console.log("(TBD) onmessage", [message.data]);
        const payload = JSON.parse(message.data);
        // app.ports.websocketIn.send(message.data);

        // Может это не самое элегантное решение
        // _.forEach(payload, (v, k) => {
        //     document.querySelectorAll(`*[data-name=${k}]`).forEach((indicator) => {
        //         console.log("Update indicator", indicator, k, v);
        //         indicator.setAttribute("value", v);
        //     });
        //
        // });

        // TODO: Тут не хватает локального сохранения данных, чтобы при изменении страницы, данные молги бы быть актуализированы

        for (var k in payload) {
            if (payload.hasOwnProperty(k)) {
                const v = payload[k];

                // Поля, начинающиеся с символа "$" явлюются служебными

                switch (k) {
                    case '$page':

                        console.log('change page to', v);
                        replacePage(v);

                        break;
                    default:
                        // old_state[k] = payload[k];
                        document.querySelectorAll(`*[data-name=${k}]`).forEach((indicator) => {
                            // console.log("Update indicator", indicator, k, v);
                            indicator.setAttribute("value", v);
                        });

                }

            }
        }
    }
    socket.onerror = (error) => {
        console.log("onerror", error.message);
    };
    socket.onclose = () => {
        // console.log("onclose");
        connect_state.classList.add("show");
        // app.ports.websocketOpened.send(false);
        socket = null;
        // Через секунду откроем сокет заново.
        setTimeout(function() {
            open(url);
        }, 1000);
    }
    return socket;
}
