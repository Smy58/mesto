import Card from './Card.js';

export default class Section{
    constructor({items, renderer}, containerSelector){
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
        //console.log(this._container);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }

    renderItem(item) {
        this.addItem(this._renderer(item));
    }
}