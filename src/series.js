import './main.scss';
// import '@google-web-components/google-chart';
import "regenerator-runtime/runtime.js";

const hwid = (location.hash || "#").slice(1) || "unknown";

console.log("Series", hwid);

import footer from './templates/footer.template.html';
document.querySelector('header').innerHTML = footer;
import {fixLinks} from './libs/utils.js';
fixLinks(hwid);

const choosed_api = (location.hostname == "localhost") ? "http://localhost:8080" : "https://sushka.navi.cc";

const series_tags = document.querySelector("#series_tags");

let filter_tags = new Set();

const series_list = document.querySelector("#series_list");

const reload = async () => {
    const response = await fetch(`${choosed_api}/series/${hwid}`);
    const series = await response.json(); // parses JSON response into native JavaScript objects
    console.log("Series list loaded", series);
    if(series.length == 0) {
        series_list.innerHTML = "Еще нет данных";
    } else {
        const tags = new Set();
        series.forEach(s => {
            tags.add(s.key);
        });

        series_tags.innerHTML = '';
        const node = document.createElement("div");
        node.data_name = undefined;
        node.addEventListener('click', (e) => {
            console.log("Filter", e.target.data_name);
            refreshSeriesList(series, e.target.data_name);
        });
        node.innerHTML = "&#x1F3F7; Все";
        series_tags.appendChild(node);

        tags.forEach((tag_name) => {
            // l += '<div>logs_name</div>';
            const node = document.createElement("div");
            // node.setAttribute("data-name", tag_name);
            node.data_name = tag_name;
            node.addEventListener('click', (e) => {
                console.log("Filter", e.target.data_name);
                refreshSeriesList(series, e.target.data_name);
            });
            node.innerHTML = "&#x1F3F7; " + tag_name;
            series_tags.appendChild(node);
        });

        refreshSeriesList(series);

        // drawChart();


    }
}

const refreshSeriesList = (series, filter) => {
    series_list.innerHTML = '';
    series.slice().reverse().forEach(s => {
        if(filter && (filter != s.key)) return;
        const node = document.createElement("div");
        node.innerHTML = `${tsFormat(s.start)} : ${s.key}`;
        if(!s.stop) {
            node.classList.add('inprogress');
        }
        node.data_id = s.id;
        node.addEventListener('click', async (e) => {
            console.log("Show series for:", e.target.data_id);

            const response = await fetch(`${choosed_api}/series/${hwid}/${e.target.data_id}`);
            const series = await response.json(); // parses JSON response into native JavaScript objects
            console.log("Series loaded", series);

            google.charts.setOnLoadCallback(() => {
                drawChart(series);
            });

            // refreshSeriesList(series, e.target.data_id);
        });
        series_list.appendChild(node)
    });
}

const tsFormat = (ts) => {
    return (new Date(ts * 1000)).toLocaleString()
}

const f = new Intl.NumberFormat('en-US', {minimumIntegerDigits:2});
const formatValue = (ts) => {
    const date = new Date(ts * 1000);
    console.log("formatValue", ts, date);
    // Форматируем значение в HH:MM
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${f.format(hours)}:${f.format(minutes)}`;
}


reload();

google.charts.load('current', {'packages':['corechart']});

function drawChart(series) {
    console.log("drawChart", series);

    // Collect keys
    let keys = new Set();
    series.forEach((s) => {
        for(let k in s.data) {
            if(s.data.hasOwnProperty(k)) {
                if(!s.data[k].includes(':')) keys.add(k);
            }
        }
    });

    const series_node = document.body.querySelector("#series");
    series_node.innerHTML = '';

    keys.forEach((k) => {
        console.log("Keys=", k);
        const node = document.createElement('div');
        node.setAttribute('data-key', k);
        node.className = "chart";
        series_node.appendChild(node);

        creareChart(node, series, k);


    });
}

const creareChart = (node, series, key) => {

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Time');
    data.addColumn('number', key);
    data.addColumn({type: 'string', role:'annotation'});
    // data.addColumn({type: 'string', role:'annotationText'});

    // series.forEach((s) => {
    //     data.addRows([
    // });
    let db = [];
    series.forEach((s) => {
        if(s.data[key]) {
            let annotation = null;
            for(let k in s.data) {
                if(s.data.hasOwnProperty(k) && s.data[k].includes(':')) {
                    // keys.add(k);
                    const p = s.data[k].match(/(.*?):(.*)/);
                    if(key == p[1]) {
                        console.log("need annotation", p[1], p[2]);
                        annotation = p[2];
                    }

                }
            }

            // return [new Date(s.ts*1000), s.data[key] | 0, annotation];
            db.push([new Date(s.ts*1000), s.data[key] | 0, annotation]);
        }
    })

    console.log("db=", db);

    data.addRows(db);

    var options = {
        title: key,
        titleTextStyle: {
            color: "#5533ff",
            fontSize: 26,
        },
        // width: 900,
        // height: 500,
        legend: {position: 'none'},
        width: '100%',
        height: '300',
        // chartArea:{left:30,top:30,width:"100%",height:"200"},
        theme: 'maximized',
        hAxis: {
            // title: 'Time',
            format: 'HH:mm',
            gridlines: {count: 5, color: '#ccc'},
            // gridlines: {},
            // textStyle: {
            //   color: '#01579b',
            //   fontSize: 20,
            //   fontName: 'Arial',
            //   bold: true,
            //   italic: true
            // },
            // titleTextStyle: {
            //   color: '#01579b',
            //   fontSize: 16,
            //   fontName: 'Arial',
            //   bold: false,
            //   italic: true
            // }
        },
        vAxis: {
            title: '',
            // textStyle: {
            //     color: '#1a237e',
            //     fontSize: 24,
            //     bold: true
            // },
            // titleTextStyle: {
            //     color: '#1a237e',
            //     fontSize: 24,
            //     bold: true
            // }
        },
        colors: ['green', '#097138'],
        crosshair: { trigger: 'both', color: "green", opacity: 0.4 },
        explorer: {},
        fontSize: 22,
        lineWidth: 3,
        series: {
          0: {
            annotations: {
              textStyle: {fontSize: 18, color: 'red' }
            }
          }
        }        // pointSize: 5
    };

    // var options = {
    //   title: 'Заголовок',
    //   curveType: 'function',
    //   legend: { position: 'bottom' }
    // };

    var chart = new google.visualization.LineChart(node);

    chart.draw(data, options);
}

// drawChart();
