import manipulateData from "./manipulateData.js";

const filters = (container, elem) => {
    const containerFilters = document.querySelector(container),
          containerCheckbox = document.querySelector('.boxes'),
          inputCheckbox = document.querySelectorAll('.boxes > div > input');

    containerCheckbox.addEventListener('click', (e) => {
        const target = e.target;
        
        inputCheckbox.forEach(item => {
            item.checked = false;
        });

        if (target && target.classList.contains('boxes-filter')) {
            target.checked = true;
        }
    });

    manipulateData("http://localhost:3000/filters")
        .then(data => {
            data.forEach(item => {
                createFilters(item.id, item.label, item.color)
                if (item.color === 'all') {
                    document.querySelector('.filter-btn').classList.add('active');
                }
            });
        });

    function createFilters(id, label, color) {
        const element = document.createElement(elem);
        element.setAttribute("id", id);

        switch(elem) {
            case "button":
                element.classList.add(color);
                element.classList.add("filter-btn");

                containerFilters.addEventListener('click', (e) => {
                    const target = e.target;
                    const arr = [].slice.call(containerFilters.children);
            
                    if (target && target.classList.contains('filter-btn')) {
                        arr.forEach(item => {
                            item.classList.remove('active');
                        });
            
                        target.classList.add('active');
                    }
                });
                break;
            case "option":
                if (color === "all") return;
                element.setAttribute("value", color);
                break;
            default:
                break;
        }

        element.textContent = label;
        containerFilters.appendChild(element);
    }
}

export default filters;