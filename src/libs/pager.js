
const choosed_api = (location.hostname == "localhost") ? "http://localhost:8080" : "https://sushka.navi.cc";

function createNode(el, setSender) {
    // console.log("createNode", el.t);
    const node = document.createElement("ui-" + el.t);
    // const node = document.createElement(el.t);

    switch (el.t) {
        case "page":
            // Компонент pager (TODO: переименовать) реализован по-особому.
            console.log("createNode/pager", el);
            node.setAttribute('data-name', el.name);
            node.value = (el.childs.length > 0) ? (el.childs[0].value) : "unknown";
            let nodes = [];
            el.childs.forEach((ch) => {
                // {title: 'Страница 1', value: 'page1', childs: page1src}
                nodes.push({
                    title: ch.title,
                    value: ch.value,
                    childs: parseElement(ch.childs, setSender, true)
                });
            });

            // node.appendChild(parseElement(el.value, setSender, true));
            console.log("Page nodes", nodes);
            node.childs = nodes;

            // Опционально можно сообщать прибору про выбор активной страницы
            setSender(node);

            break;
        case "pager":
            // Компонент pager (TODO: переименовать) реализован по-особому.
            console.log("createNode/pager", el);
            node.setAttribute('data-name', el.name);
            if(el.style) {
                node.setAttribute("style", el.style);
            }
            var child_names = [];
            var child_titles = [];
            try {
                child_names = JSON.parse(el.childs);
                child_titles = JSON.parse(el.titles);
            } catch (e) {
                // console.log("Childs is not valid JSON", e);
                // child_names = []
                // return node;
            }
            // TODO: поле value может быть задано в компоненте
            console.warn("TODO: Поле value может быть задано в компоненте.");
            // node.value = (el.childs.length > 0) ? (el.childs[0].value) : "unknown";
            // node.value = undefined;
            node.value = el.value;
            // setTimeout(() => {
            //     // node.value = el.value;
            //     node.requestUpdate();
            // }, 1000);

            let sub_nodes = [];

            // TODO: Используем Promise.all для выполнения всех fetch

            const fetches = child_names.map((name, i) => {
                // console.log("Try map", name, child_titles[i]);
                return fetch(`${choosed_api}/page/${name}`)
                    .then(p => p.json())
                    .then(p => {
                        console.log("Loaded sub page", p);
                        return {
                            title: child_titles[i] || name,
                            value: name,
                            // childs: parseElement(ch.childs, setSender, true)
                            childs: parseElement(p, setSender, true)
                        };
                        // // const page_node = Pager(p, setSender);
                        // // container.replaceChildren(page_node);
                        // // {title: 'Страница 1', value: 'page1', childs: page1src}
                        // sub_nodes.push({
                        //     title: name,
                        //     value: name,
                        //     // childs: parseElement(ch.childs, setSender, true)
                        //     childs: parseElement(p, setSender, true)
                        // });
                        // // node.requestUpdate();
                        // console.log("Pager nodes", sub_nodes);
                        // node.childs = sub_nodes;
                });
            });

            Promise.all(fetches).then((p) => {
                console.log("All pages is loaded", p);
                node.childs = p;
                // node.value = el.value;
                node.setAttribute("value", el.value);
                node.requestUpdate();

                // Опционально можно сообщать прибору про выбор активной страницы
                setSender(node);
            });

            // child_names.forEach((name) => {
            //     fetch(`${choosed_api}/page/${name}`)
            //     .then(p => p.json())
            //     .then(p => {
            //         console.log("Loaded sub page", p);
            //         // const page_node = Pager(p, setSender);
            //         // container.replaceChildren(page_node);
            //         // {title: 'Страница 1', value: 'page1', childs: page1src}
            //         sub_nodes.push({
            //             title: name,
            //             value: name,
            //             // childs: parseElement(ch.childs, setSender, true)
            //             childs: parseElement(p, setSender, true)
            //         });
            //         // node.requestUpdate();
            //         console.log("Pager nodes", sub_nodes);
            //         node.childs = sub_nodes;
            //     });
            // });

            // node.appendChild(parseElement(el.value, setSender, true));
            // node.childs = sub_nodes;

            // Опционально можно сообщать прибору про выбор активной страницы
            // setSender(node);

            break;

        default:
            // Имя параметра передается через атрибуты, остальное лучше передать как propertie
            for(var k in el) {
                if(el.hasOwnProperty(k)) {
                    switch (k) {
                        case "name":
                            node.setAttribute('data-name', el.name);
                        break;
                        default:
                            node[k] = el[k];
                            // Возможно решение не самое элегантное
                            if(k=="value") {
                                setSender(node);
                            }
                    }
                }
            }

    }

    return node;
}

function parseElement(el, setSender, root) {
    if(el instanceof Array) {
        const row = document.createElement("div");
        if(!root) {
            row.classList.add('displaycontainer');
        }
        el.forEach((elItem) => {
            row.appendChild(parseElement(elItem, setSender, false));
        });
        return row;
    } else if(el instanceof Object) {
        // Новый формат страниц может быть не только массивом
        if(root) {
            // TODO: Рещение не самое элегантное
            // Пример объекта корня:
            // {
            //     style: '--color: lime'
            //     $childs: [ол]
            // }
            console.log("Info! New page format", el);
            el.t = 'div';
            const root_node = createNode(el, setSender);

            el["$childs"].forEach((elItem) => {
                root_node.appendChild(parseElement(elItem, setSender, false));
            });
            return root_node;

            // return parseElement(el, setSender, root)
        }
        return createNode(el, setSender);
    } else {
        console.log("Only Array or Object is supported.", el)
    }
}

function Pager(page, setSender) {
    return parseElement(page, setSender, true);
}

export default Pager;
