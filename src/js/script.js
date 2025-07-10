"use strict";

import items from './modules/items.js';
import filters from "./modules/filters.js"

window.addEventListener("DOMContentLoaded", () => {
    const filterState = {
        active: ''
    };

    items();
    filters("#color", "option");
    filters(".btns", "button");
});