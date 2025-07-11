import manipulateData from "./manipulateData.js";

const items = () => {
    const input = document.querySelector('.input'),
          btn = document.querySelector('button'),
          container = document.querySelector('.list'),
          colors = document.querySelector('#color'),
          filterContainer = document.querySelector('.filters');

    let nextId = 0,
        activeColorFilter = 'all',
        activeStateFilter = 'all';

    manipulateData("http://localhost:3000/items")
        .then(data => {
            data.forEach(item => {
                nextId = parseInt(item.id) + 1;
                createItems(item.id, item.text, item.done, item.className);
            });

            filterContainer.addEventListener('click', (e) => {
                const target = e.target;

                if (target && (target.classList.contains('filter-btn') || target.classList.contains('boxes-filter'))) {
                    document.querySelectorAll('.items').forEach(item => item.remove());

                    if (target.classList.contains('boxes-filter')) {
                        activeStateFilter = target.getAttribute('name');
                    };

                    if (target.classList.contains('filter-btn')) {
                        activeColorFilter = target.getAttribute('id');
                    };

                    let newData = [...data];

                    if (activeColorFilter === 'all' && activeStateFilter === 'all') {
                        newData.forEach(item => {
                            createItems(item.id, item.text, item.done, item.className);
                        });

                        return;
                    };

                    if (activeColorFilter !== 'all') {
                        newData = newData.filter(item => activeColorFilter === item.className);
                    };

                    if (activeStateFilter !== 'all') {
                        if (activeStateFilter === 'done') {
                            newData = newData.filter(item => item.done === true);
                        } else if (activeStateFilter === 'notDone') {
                            newData = newData.filter(item => item.done === false);
                        };
                    };

                    if (newData.length === 0) return;
                    
                    newData.forEach(item => {
                        createItems(item.id, item.text, item.done, item.className);
                    });
                };
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
            done: false,
            className: colors.value
        };

        input.setAttribute('placeholder', 'Введіть завдання');

        if (!input.value) {
            input.setAttribute('placeholder', 'Введіть, будь ласка, назву!');
        } else {
            input.classList.add('input');
        };

        manipulateData("http://localhost:3000/items", "POST", JSON.stringify(newObj));
    });

    function createItems(id, name, box, className) {
        const item = document.createElement('li');
        item.classList.add('items');
        item.classList.add(className);
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
}

export default items;