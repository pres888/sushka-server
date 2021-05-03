import './main.scss';

const hwid = (location.hash || "#").slice(1) || "unknown";

console.log("Series", hwid);

import footer from './templates/footer.template.html';
document.querySelector('header').innerHTML = footer;
import {fixLinks} from './libs/utils.js';
fixLinks(hwid);

const choosed_api = (location.hostname == "localhost") ? "http://localhost:8080" : "https://sushka.navi.cc";

const logs_list_div = document.querySelector("#series_list");
const reload = async () => {
    const response = await fetch(`${choosed_api}/series/${hwid}`);
    const logs = await response.json(); // parses JSON response into native JavaScript objects
    console.log("Series list loaded", logs);
    if(logs.length == 0) {
        logs_div.innerHTML = "Еще нет данных";
    } else {
        logs_list_div.replaceChildren();
        const tags = [];
        logs.forEach(s => {
            if(!tags.includes(s.key)) {
                tags.push(s.key);
            }
        });


        tags.forEach((tag_name) => {
            // l += '<div>logs_name</div>';
            const node = document.createElement("div");
            node.setAttribute("data-name", tag_name);
            node.addEventListener('click', () => loadLogs(tag_name));
            node.innerHTML = "&#128472; " + tag_name;
            logs_list_div.appendChild(node);
        });

    }
}

const tsFormat = (ts) => {
    return (new Date(ts * 1000)).toLocaleString()
}

const logs_div = document.querySelector("#series");
const loadLogs = async (logsName) => {
    console.log("loadLogs", logsName);
    const response = await fetch(`${choosed_api}/logs/${hwid}/${logsName}`);
    const logs = await response.json(); // parses JSON response into native JavaScript objects
    console.log("Logs loaded", logs);

    let l = [];
    logs.forEach(line => {
        const   t = line.t,
                v = line.v;
        l.push(`<div><span class="ts">${tsFormat(t)}</span><span class="log_line">${v}</span></div>`);
    });
    logs_div.innerHTML = l.join('');


}

reload();
