"use strict";

const input = document.querySelector('.input'),
      btn = document.querySelector('button'),
      container = document.querySelector('.list'),
      items = document.querySelectorAll('.items'),
      deleteBtn = document.querySelectorAll('.delete-btn');
    
container.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('delete-btn')) {
        e.preventDefault();
            
        target.parentNode.remove();
    };

    if (target && target.classList.contains('items')) {
        target.children[0].children[0].checked = !target.children[0].children[0].checked;
        target.style.background = "rgb(204, 204, 204)"

        if (!target.children[0].children[0].checked) {
            target.style.background = ""
        }
    };
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    input.setAttribute('placeholder', 'Введіть завдання');

    if (!input.value) {
        input.setAttribute('placeholder', 'Введіть, будь ласка, назву!');
    } else {
        input.classList.add('input');
        createItems();
    }
});

function createItems() {
    const item = document.createElement('li');
    item.classList.add('items');
    container.appendChild(item);

    const div = document.createElement('div');
    item.appendChild(div);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = false;
    div.appendChild(checkbox);

    const text = document.createElement('span');
    text.classList.add('items-txt');
    text.textContent = input.value;
    div.appendChild(text);

    const btn = document.createElement('button');
    btn.textContent = 'Видалити';
    btn.classList.add('delete-btn');
    item.appendChild(btn);

    input.value = "";
};
