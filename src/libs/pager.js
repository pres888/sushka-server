
function createNode(el, setSender) {
    const node = document.createElement("ui-" + el.t);

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
            node.childs = nodes;

            // Опционально можно сообщать прибору про выбор активной страницы
            setSender(node);

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
        return createNode(el, setSender);
    } else {
        console.log("Only Array or Object is supported.")
    }
}

function Pager(page, setSender) {
    return parseElement(page, setSender, true);
}

export default Pager;
