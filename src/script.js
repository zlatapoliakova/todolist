"use strict";

const input = document.querySelector('.input'),
      btn = document.querySelector('button'),
      container = document.querySelector('.list');

let nextId = 0;

const manipulateData = async (url, method = "GET", body = null, headers = {}) => {
    const res = await fetch(url, {method, body, headers});

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

manipulateData("http://localhost:3000/items")
    .then(data => {
        data.forEach(item => {
            nextId = parseInt(item.id) + 1;
            createItems(item.id, item.text, item.done);
        });
    })
    .catch(() => console.log('error'));
    
container.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('delete-btn')) {
        e.preventDefault();

        const id = target.parentNode.getAttribute("id");
        manipulateData(`http://localhost:3000/items/${id}`, "DELETE"); 
    };

    if (target && target.classList.contains('items')) {
        const id = target.getAttribute("id");

        manipulateData(`http://localhost:3000/items/${id}`, "PATCH", JSON.stringify({
                done: !target.children[0].children[0].checked
            }));
    };
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const newObj = {
        id: nextId.toString(),
        text: input.value,
        done: false
    };

    input.setAttribute('placeholder', 'Введіть завдання');

    if (!input.value) {
        input.setAttribute('placeholder', 'Введіть, будь ласка, назву!');
    } else {
        input.classList.add('input');
    };

    manipulateData("http://localhost:3000/items", "POST", JSON.stringify(newObj));
});

function createItems(id, name, box) {
    const item = document.createElement('li');
    item.classList.add('items');
    item.setAttribute('id', id);
    container.appendChild(item);

    const div = document.createElement('div');
    item.appendChild(div);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = box; 
    div.appendChild(checkbox);

    if (checkbox.checked) {
        item.style.background = "rgb(204, 204, 204)";
    };

    const text = document.createElement('span');
    text.classList.add('items-txt');
    text.textContent = name;
    div.appendChild(text);

    const btn = document.createElement('button');
    btn.textContent = 'Видалити';
    btn.classList.add('delete-btn');
    item.appendChild(btn);

    input.value = "";
};
