// import {PolymerElement, html} from '@polymer/polymer';
// import {LitElement, html, customElement} from 'lit-element';
import {LitElement, html} from 'lit-element';
import '@google-web-components/google-chart';

import './ui/temperature.js';

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
const choosed_endpoint = "ws://localhost:8082";


// Простейшая реализация WebSocket
// TODO: Возможно стоит взять связку socket.io + socketio-client
let socket;
function open(url) {
    console.log("WS: open", url);
    socket = new WebSocket(url);
    socket.onopen = () => {
        console.log("(TBD) onopen");
        // app.ports.websocketOpened.send(true);
    }
    socket.onmessage = message => {
        console.log("(TBD) onmessage", [message.data, JSON.parse(message.data)]);
        // app.ports.websocketIn.send(message.data);
    }
    socket.onerror = (error) => {
        console.log("onerror", error.message);
    };
    socket.onclose = () => {
        console.log("onclose");
        // app.ports.websocketOpened.send(false);
        socket = null;
        // Через секунду откроем сокет заново.
        setTimeout(function() {
            open(url);
        }, 1000);
    }
}

open(choosed_endpoint);
