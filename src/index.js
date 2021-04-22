// import {PolymerElement, html} from '@polymer/polymer';
// import {LitElement, html, customElement} from 'lit-element';
import {LitElement, html} from 'lit-element';
// import '@google-web-components/google-chart';
// import _ from "lodash";

// import "@fortawesome/fontawesome-free/css/all.min.css";

// import './ui/temperature.js';
import './ui/display.js';
import './ui/gauge.js';
import './ui/progress.js';

import './main.scss';

// Для прототипа пока так:
// Идентификатор оборудования передается в адресной строке в виде хеша
const hwid = (location.hash || "#").slice(1) || "unknown";


console.log("Hello, sushka!");


// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }


const hostname = location.hostname;
// const isSSH = location.protocol == "https:";
const protocol = location.hostname == "localhost" ? "wss:" : ((location.protocol == "https:") ? "wss:" : "ws:");

const local_api_endpoint = protocol + "//localhost:8082";
const global_api_endpoint = protocol + "//" + hostname;
const sushka_api_endpoint = protocol + "//sushka.navi.cc:8082";

// Возможно стоит сразу это запускать на firebase
// sushka-ca60d.web.app
// const choosed_endpoint = (hostname=="localhost" || hostname=="sushka.navi.cc") ? sushka_api_endpoint : global_api_endpoint;

// TODO: Now its fixed
// const choosed_endpoint = "ws://localhost:8082";


// const choosed_endpoint = (hostname == "sushka-96671.web.app") ? "wss://sushka.navi.cc:8082" : "wss://"+hostname+":8082";
// const choosed_endpoint = (hostname == "sushka-96671.web.app") ? "wss://sushka.navi.cc/socket" : "wss://"+hostname+"/socket";
// const choosed_endpoint = "wss://sushka.navi.cc/socket";
const choosed_endpoint = (location.hostname == "localhost") ? "ws://localhost:8082/socket" : "wss://sushka.navi.cc/socket";


// Простейшая реализация WebSocket
// TODO: Возможно стоит взять связку socket.io + socketio-client
let socket;
const connect_state = document.querySelector("#connect_state");

// Что за?
// import progress from './imgs/progress.gif';
// // console.log("progress=", progress);
// connect_state.querySelector('img').setAttribute('src', progress);

function open(url) {
    const path = url + "?hwid=" + hwid;
    console.log("WS: open", path);
    socket = new WebSocket(path);
    socket.onopen = () => {
        console.log("(TBD) onopen");
        connect_state.classList.remove("show");
        // app.ports.websocketOpened.send(true);
    }
    socket.onmessage = message => {
        console.log("(TBD) onmessage", [message.data]);
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

        for (var k in payload) {
            if (payload.hasOwnProperty(k)) {
                const v = payload[k];
                // old_state[k] = payload[k];
                document.querySelectorAll(`*[data-name=${k}]`).forEach((indicator) => {
                    console.log("Update indicator", indicator, k, v);
                    indicator.setAttribute("value", v);
                });
            }
        }
    }
    socket.onerror = (error) => {
        console.log("onerror", error.message);
    };
    socket.onclose = () => {
        console.log("onclose");
        connect_state.classList.add("show");
        // app.ports.websocketOpened.send(false);
        socket = null;
        // Через секунду откроем сокет заново.
        setTimeout(function() {
            open(url);
        }, 1000);
    }
}

open(choosed_endpoint);


function sendCmd(name, value) {
    const payload = {
        cmd: "cmd",
        name: name,
        value: value
    };
    socket.send(JSON.stringify(payload));
}

// Команды управления

document.querySelectorAll('button[data-control="cmd"]').forEach((cmd) => {
    const name = cmd.getAttribute('data-name');
    const value = cmd.getAttribute('data-value');
    cmd.addEventListener('click', (e) => {
        console.log("Click command", cmd);
        sendCmd(name, value);
    });
});

document.querySelectorAll('input[type="range"][data-control="cmd"]').forEach((cmd) => {
    const name = cmd.getAttribute('data-name');
    cmd.addEventListener('change', (e) => {
        const value = cmd.value;
        console.log("Slider command", name, value);
        sendCmd(name, value);
    });
    // Для label
    const updateLabel = () => {
        document.querySelectorAll('label[data-name="'+name+'"]').forEach((label) => {
            label.innerHTML = cmd.value.toString();
        });
    }
    cmd.addEventListener('input', (e) => {
        updateLabel();
    });
    updateLabel();

});
