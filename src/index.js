// import "@fortawesome/fontawesome-free/css/all.min.css";
import "regenerator-runtime/runtime.js";

import './ui/display.js';
import './ui/gauge.js';
import './ui/progress.js';
import './ui/input.js';
import './ui/range.js';
import './ui/button.js';
import './ui/progress.js';
import './ui/time.js';
import './ui/page.js';
import './ui/pager.js';
// import './ui/babel.js';

import './main.scss';

import open from './libs/socket.js';
import Pager from './libs/pager.js';
import {replaceChildren} from './libs/utils.js';

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


// На все компоненты повесим обработчик

const setSender = (cmd) => {
    const name = cmd.getAttribute('data-name');
    if(name) {
        cmd.addEventListener('change', (e) => {
            const value = cmd.value;

            const payload = {
                cmd: "cmd",
                name: name,
                value: value
            };
            // TODO: Тут есть один недостаток.
            // Если данные изменились в момент обрыва связи, то передача будет проигнорирована
            // В идеале, надо делать очередь команд и сохранять их в моменты отсуствия связи
            // и передавать после установки соединения.
            try {
                socket.send(JSON.stringify(payload));
            } catch(e) {
                console.log("WebSocket: error sending.");
            }
        });
    }
}

// document.querySelectorAll('ui-input, ui-range, ui-button').forEach(setSender);

// // Add dynamic content
// const container = document.querySelector("#container");
//
// // Indicator
// const el = document.createElement("ui-gauge");
// el.setAttribute('data-name', "t1");
// el.title = "Щуп1";
// el.min = 10;
// el.max = 70;
// el['data-suffix'] = "°C";
// container.appendChild(el);
//
//
// // Control
//
// // <ui-button title="Кнопка 1" data-name="key1" value="1"></ui-button>
// const btn1 = document.createElement("ui-button");
// btn1.setAttribute('data-name', "key1");
// btn1.title = "Кнопка1"
// btn1.value = "1";
// setSender(btn1);
// container.appendChild(btn1);

// const page1src = [
//     [{t: 'progress', name: 'wifi', title: "📶", max: 100}],
//     [
//         {t: 'gauge', name: 't1', title: "Щуп", min: 10, max: 70, 'data-suffix': '°C'},
//         {t: 'gauge', name: 'vacuum1', title: "Вакуум", min: 400, max: 1000, 'data-suffix': 'pa'}
//     ],
//     [
//         {t: 'display', name: 't1', title: "Щуп", 'data-suffix': '°C'},
//         {t: 'display', name: 'vacuum1', title: "Вакуум", 'data-suffix': 'pa'},
//     ],
//     [
//         {t: 'display', name: 't1', title: "Полка1", 'data-suffix': '°C'},
//         {t: 'display', name: 't2', title: "Полка2", 'data-suffix': '°C'},
//         {t: 'display', name: 't3', title: "Полка3", 'data-suffix': '°C'},
//         {t: 'display', name: 't4', title: "Полка4", 'data-suffix': '°C'},
//     ],
//     [{t: 'display', name: 'time'}],
//     [{t: 'button', name: 'key1', title: "Кнопка1", value: "1"}],
//     [{t: 'button', name: 'key2', title: "Кнопка2", value: "1"}],
//     [
//         {t: 'button', name: 'key3', title: "Кнопка3-1", value: "1"},
//         {t: 'button', name: 'key3', title: "Кнопка3-2", value: "2"}
//     ],
//     {t: 'range', name: 'slide1', title: "1..100", value: "50", min: 1, max: 100},
//     {t: 'range', name: 'slide2', title: "40..60", value: "50", min: 40, max: 60},
//     {t: 'input', name: 'tsub', title: "Время сублимации:", value: "30", min: 20, max: 40, 'data-suffix': 'мин'},
//     {t: 'input', name: 'tfreez', title: "Время заморозки:", value: "30", min: 20, max: 40, 'data-suffix': 'мин'},
// ];
// const page1node = Pager(page1src, setSender);
//
// const page2src = [
//     [{t: 'progress', name: 'wifi', title: "📶", max: 100}],
//     [
//         {t: 'gauge', name: 't1', title: "Полка1", min: 10, max: 70, 'data-suffix': '°C'},
//         {t: 'gauge', name: 't2', title: "Полка2", min: 10, max: 70, 'data-suffix': '°C'},
//         {t: 'gauge', name: 't3', title: "Полка3", min: 10, max: 70, 'data-suffix': '°C'},
//         {t: 'gauge', name: 't4', title: "Полка4", min: 10, max: 70, 'data-suffix': '°C'},
//     ],
//     [
//         {t: 'button', name: 'key1', title: "Кнопка1", value: "1"},
//         {t: 'button', name: 'key2', title: "Кнопка2", value: "2"},
//         {t: 'button', name: 'key3', title: "Кнопка2", value: "3"},
//         {t: 'button', name: 'key4', title: "Кнопка2", value: "4"},
//     ],
// ];
// console.log("default", JSON.stringify(page2src));
// const page2node = Pager(page2src, setSender);
//
// // Страница, сама состоящая из двух страниц
// const page3src = [
//     {t: 'page', name: 'pager1', childs: [
//         {title: 'Страница 1', value: 'page1', childs: page1src},
//         {title: 'Страница 2', value: 'page2', childs: page2src}
//     ]},
// ];
// const page3node = Pager(page3src, setSender);
//
// // container.appendChild(page1node);
// // setTimeout(() => {
// //     console.log("replace page (TBD)");
// //     container.replaceChildren(page2node);
// // }, 3000);
//
// container.appendChild(page3node);

const choosed_api = (location.hostname == "localhost") ? "http://localhost:8080" : "https://sushka.navi.cc";

const replacePage = (name) => {
    fetch(`${choosed_api}/page/${name}`)
    .then(p => p.json())
    .then(p => {
        const container = document.querySelector("#container");
        // console.log("Try to replace page to", container);
        const page_node = Pager(p, setSender);
        replaceChildren(container, page_node);
        // Грязный хак по трансляции фона страницы
        document.body.setAttribute('style', page_node.getAttribute('style'));
        // document.body.style.color = page_node.style.getPropertyValue('--color')
        // document.body.style.background = page_node.style.getPropertyValue('--background')
        // console.log("page_node", page_node);
        // if()
    });
}
replacePage('default');

let socket = open(choosed_endpoint, hwid, replacePage);


import footer from './templates/footer.template.html';
document.querySelector('header').innerHTML = footer;
import {fixLinks} from './libs/utils.js';
fixLinks(hwid);
