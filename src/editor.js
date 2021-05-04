import './main.scss';
import './editor.scss';

import './ui/component.js';
import "regenerator-runtime/runtime.js";


const choosed_api = (location.hostname == "localhost") ? "http://localhost:8080" : "https://sushka.navi.cc";


window.location.hash = "no-back-button";
window.location.hash = "Again-No-back-button";

window.onhashchange = function(){
    window.location.hash = "no-back-button";
}
// history.pushState(null, document.title, location.href);
// window.addEventListener('popstate', function (event)
// {
//     history.pushState(null, document.title, location.href);
// });

async function loadPageList() {
    const response = await fetch(choosed_api + '/pages');
    const pages = await response.json(); // parses JSON response into native JavaScript objects
    console.log("pages", pages);
    const page_list = document.querySelector("#page_list");
    page_list.innerHTML = '';

    pages.forEach((page_name) => {
        const li = document.createElement("li");
        li.innerHTML = page_name;
        li.addEventListener('click', () => {
            console.log("Select page:", page_name);

            document.querySelector('#page_root').classList.remove('show');
            document.querySelector('#page_editor').classList.add('show');

            document.querySelector('input#page_name').value = page_name;

            // const page_src_node = document.querySelector('textarea[name="page_src"]');

            fetch(`${choosed_api}/page/${page_name}`)
                .then(res => res.json())
                .then( p => {
                    // page_src_node.value = JSON.stringify(p, undefined, 4);
                    // page_src_node.value = YAML.stringify(p);
                    console.log('Page', page_name, 'is loaded', p);

                    replaceChildren(workspace);

                    if(p instanceof Array) {
                        p.forEach((el) => parser(el, workspace));
                    } else {
                        p["$childs"].forEach((el) => parser(el, workspace));
                        let ex = '';
                        for(let k in p) {
                            if(p.hasOwnProperty(k) && !k.startsWith('$')) {

                                ex += `${k}=${p[k]}\n`;
                            }
                        }
                        document.querySelector("#page_config textarea").value = ex;
                    }


                })
                .catch( e => console.log("Error fetch ", e));

        });
        page_list.appendChild(li);
    });

    // Кнопка создания страницы
    const li = document.createElement("li");
    li.innerHTML = "&#10133; Создать новую страницу";
    li.addEventListener('click', () => {
        document.querySelector('#page_root').classList.remove('show');
        document.querySelector('#page_editor').classList.add('show');

        document.querySelector('input#page_name').value = 'укажите имя';
        document.querySelector('textarea[name="page_src"]').value = '';
    });
    page_list.appendChild(li);

}

console.log("Load pages...");
loadPageList();


const workspace = document.querySelector("#workspace");

// console.log("exeditor", workspace);

// const component = document.createElement("ui-component");
// component.title = "Фейковые строки";
// workspace.appendChild(component);

document.querySelector("#add_row").onclick = () => {
    console.log("On append row");
    look();
    workspace.appendChild(newRow());
};
document.querySelector("#add_component").onclick = () => {
    console.log("On append component");
    addComponentTo(workspace);
};

let looked_el;
const cd_t = document.querySelector("#cd_t");
const cd_name = document.querySelector("#cd_name");
const cd_value = document.querySelector("#cd_value");
const cd_title = document.querySelector("#cd_title");
const cd_extended = document.querySelector("#cd_extended");

const component_details = document.querySelector("#component_details");
component_details.style = "display:none";

const look = (el) => {
    // console.log("look at component", el, el.data);
    if(looked_el) {
        looked_el.classList.remove("active");
    }
    looked_el = el;
    if(!el) {
        component_details.style = "display:none";
        return;
    };
    el.classList.add("active");
    component_details.style = "display:block";
    cd_t.value = el.data.t;
    cd_name.value = el.data.name;
    cd_value.value = el.data.value;
    cd_title.value = el.data.title;

    // Остальные поля разрешим добавлять в свободном виде
    let extened = '';
    for (var k in el.data) {
        if (el.data.hasOwnProperty(k)) {
            if(["t", "name", "value", "title"].includes(k)) continue;
            extened += `${k}=${el.data[k]}\n`;
            // console.log("extended field:", k, el.data[k]);
        }
    }
    cd_extended.value = extened;
}

const fielder = (el, field) => {
    el.addEventListener("input", (ev) => {
        // console.log("onInput", ev.target.value);
        if(looked_el) {
            looked_el.setData(field, ev.target.value);
        }
    });
}

fielder(cd_t, "t");
fielder(cd_name, "name");
fielder(cd_value, "value");
fielder(cd_title, "title");


const exToObj = (data, rows) => {
    rows.forEach((line) => {
        if(!line.match('=')) return;
        const comps = line.split('=');
        if(!comps[0]) return;
        const name = comps.shift();
        const value = comps.join('=');
        data[name] = value;
    });
    return data;
}

// Для редактирования расширенных полей все несколько сложнее
cd_extended.addEventListener("input", (ev) => {
    if(!looked_el) return;
    const v = ev.target.value;

    const basedata = looked_el.data;

    const rows = v.match(/.+/g) || [];
    const data = {
        t: basedata.t,
        name: basedata.name,
        value: basedata.value,
        title: basedata.title
    };

    // console.log("Fix line", name, value);
    // looked_el.setDataAbs(data);
    looked_el.data = exToObj(data, rows);
    // looked_el.update();

})

// cd_t.addEventListener("input", (ev) => {
//     console.log("onInput", ev.target.value);
//     if(looked_el) {
//         // looked_el.data.t = ev.target.value;
//         looked_el.setData("t", ev.target.value);
//         // looked_el.title = ev.target.value;
//         // looked_el.update();
//     }
// });
const addComponentTo = (parent) => {
    // TODO: Тут немного некрасиво что приходится вешать обработчики на компонент
    const new_component = document.createElement("ui-component");
    new_component.title = "display";
    new_component.data = {t: "display"};
    new_component.addEventListener("look", (ev) => look(ev.target));
    new_component.addEventListener("remove", (ev) => ev.target.remove());
    parent.appendChild(new_component);
    // И сразу его выберем для редактирования
    look(new_component);
}

const newRow = () => {
    // TODO: Возможно для строк стоит сделать другой, специальный копмонент
    const component = document.createElement("ui-component");
    component.title = "";
    component.addEventListener("remove", (ev) => {
        ev.target.remove();
    });

    component.addEventListener("add", (ev) => {
        console.log("add component to row", component);
        addComponentTo(component);
    });
    return component;
}

const parser = (el, parent) => {
    if(el instanceof Array) {
        console.log("page row", el);
        const component = newRow();

        // Сгенерируем компоненты строки
        el.forEach((ch) => parser(ch, component));

        // // Добавим кнопку добавления новых компонентов
        // const adder = document.createElement("div");
        // adder.innerHTML = "➕";
        // adder.classList.add("adder");
        // adder.onclick = () => {
        //     console.log("add component to row", component);
        // }
        // component.appendChild(adder);

        parent.appendChild(component);
    } else if(el instanceof Object) {
        console.log("page component", el);
        const component = document.createElement("ui-component");
        component.title = el.t;
        component.data = el;
        component.addEventListener("remove", (ev) => {
            ev.target.remove();
        });
        component.addEventListener("look", (ev) => look(ev.target));
        parent.appendChild(component);
    }
}

// const page_name = "page1";
// // const page_name = "default";
// document.querySelector('input#page_name').value = page_name;
// fetch(`${choosed_api}/page/${page_name}`)
//     .then(res => res.json())
//     .then( p => {
//         replaceChildren(workspace);
//         p.forEach((el) => parser(el, workspace));
//
//         // page_src_node.value = JSON.stringify(p, undefined, 4);
//         // page_src_node.value = YAML.stringify(p);
//         // yaml_editor.setValue(YAML.stringify(p));
//     })
//     .catch( e => console.log("Error fetch ", e));

const el_parser = (n) => {
    console.log('el', n.title);
    return n.data;
}

const group_parser = (g) => {
    const data = [];
    console.log('group', g.childNodes);
    g.childNodes.forEach((n) => {
        if(n.nodeName.toLowerCase() != 'ui-component') return; //skip not components
        // TODO: Все еще некрасивая реализация групп компонентов
        if(n.title == "") {
            data.push(group_parser(n));
        } else {
            data.push(el_parser(n));
        }
    });

    return data;
}

document.querySelector("#save").addEventListener("click", () => {
    const p = {
        $childs: group_parser(workspace)
    }

    // p["$childs"].forEach((el) => parser(el, workspace));
    const exconfig = document.querySelector("#page_config textarea").value;
    const rows = exconfig.match(/.+/g) || [];
    const ex = exToObj(p, rows);

    console.log("==== ex", ex, p);
    // let ex = '';
    // for(let k in p) {
    //     if(p.hasOwnProperty(k) && !k.startsWith('$')) {
    //
    //         ex += `${k}=${p[k]}\n`;
    //     }
    // }

    const new_page_name = document.querySelector('input#page_name').value;
    // // Восстановим данные из DOM-дерева
    // // workspace.
    // // workspace.querySelectorAll('ui-component').forEach((n) => {
    // workspace.childNodes.forEach((n) => {
    //     if(n.nodeName.toLowerCase() != 'ui-component') return; //skip not components
    //     // TODO: Все еще некрасивая реализация групп компонентов
    //     if(n.title == "") {
    //         data.push(group_parser(n));
    //     } else {
    //         data.push(el_parser(n));
    //     }
    // });


    console.log("Save page (TBD)", new_page_name, ex);

    fetch(`${choosed_api}/page/${new_page_name}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(ex, undefined, 4) // body data type must match "Content-Type" header
    });

});

// Кнопка возврата на гравную
document.querySelector("button#back").addEventListener('click', () => {
    look();
    document.querySelector('#page_editor').classList.remove('show');
    document.querySelector('#page_root').classList.add('show');
    loadPageList();
});

// Настройка самой страницы
// document.querySelector("button#config").addEventListener('click', () => {
//     console.log("Параметры самой страницы");
//     look();
//     // document.querySelector('#page_editor').classList.remove('show');
//     // document.querySelector('#page_root').classList.add('show');
//     // loadPageList();
// });
