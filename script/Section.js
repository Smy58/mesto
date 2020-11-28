import Card from './Card.js';

export default class Section{
    constructor({items, renderer}, containerSelector){
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this.renderItems();
    }

    addItem(element) {
        this._container.prepend(element);
        //console.log(this._container);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            //console.log('___');
            //console.log(this._renderer(item));
            this.addItem(this._renderer(item));
        });
    }
}