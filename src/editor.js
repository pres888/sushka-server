import './main.scss';
import './editor.scss';
import YAML from 'yaml';

console.log("TBD. Редактор страниц.");

// const api_url = "http://localhost:8080";
const choosed_api = (location.hostname == "localhost") ? "http://localhost:8080" : "https://sushka.navi.cc";

async function loadPageList() {
    const response = await fetch(choosed_api + '/pages');
    const pages = await response.json(); // parses JSON response into native JavaScript objects
    console.log("pages", pages);
    const page_list = document.querySelector("#page_list");
    page_list.replaceChildren();

    pages.forEach((page_name) => {
        const li = document.createElement("li");
        li.innerHTML = page_name;
        li.addEventListener('click', () => {
            console.log("Select page:", page_name);

            document.querySelector('#page_root').classList.remove('show');
            document.querySelector('#page_editor').classList.add('show');

            document.querySelector('input#page_name').value = page_name;

            const page_src_node = document.querySelector('textarea[name="page_src"]');

            fetch(`${choosed_api}/page/${page_name}`)
                .then(res => res.json())
                .then( p => {
                    // page_src_node.value = JSON.stringify(p, undefined, 4);
                    page_src_node.value = YAML.stringify(p);

                })
                .catch( e => console.log("Error fetch ", e));

            // const page_response = await
            // const page_src = await page_response; //.json(); // parses JSON response into native JavaScript objects


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

// Кнопка возврата на гравную
document.querySelector("button#back").addEventListener('click', () => {
    document.querySelector('#page_editor').classList.remove('show');
    document.querySelector('#page_root').classList.add('show');
    loadPageList();
});

// Кнопка сохранения
document.querySelector("button#save").addEventListener('click', () => {

    const page_src_node = document.querySelector('textarea[name="page_src"]');
    const page_name = document.querySelector('input#page_name').value;
    const p = YAML.parse(page_src_node.value);

    console.log("Save page to", p);

    fetch(`${choosed_api}/page/${page_name}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(p, undefined, 4) // body data type must match "Content-Type" header
    });

    // Также. Вернемся на главную
    // document.querySelector('#page_editor').classList.remove('show');
    // document.querySelector('#page_root').classList.add('show');
});
