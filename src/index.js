// import "@fortawesome/fontawesome-free/css/all.min.css";

import './ui/display.js';
import './ui/gauge.js';
import './ui/progress.js';
import './ui/input.js';
import './ui/range.js';
import './ui/button.js';
import './ui/progress.js';

import './main.scss';

import open from './libs/socket.js';

// Для прототипа пока так:
// Идентификатор оборудования передается в адресной строке в виде хеша
const hwid = (location.hash || "#").slice(1) || "unknown";


// firebase phone auth
// import { getAuth } from "firebase/auth";
// const auth = getAuth();
// auth.languageCode = 'ru';
// console.log("Auth", auth);


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


const connect_state = document.querySelector("#connect_state");

// Что за?
// import progress from './imgs/progress.gif';
// // console.log("progress=", progress);
// connect_state.querySelector('img').setAttribute('src', progress);

let socket = open(choosed_endpoint, hwid);


// На все компоненты повесим обработчик

document.querySelectorAll('ui-input, ui-range, ui-button').forEach((cmd) => {
    const name = cmd.getAttribute('data-name');
    cmd.addEventListener('change', (e) => {
        const value = cmd.value;
        // console.log("UI-input change command", name, value);

        const payload = {
            cmd: "cmd",
            name: name,
            value: value
        };
        socket.send(JSON.stringify(payload));

    });
});
