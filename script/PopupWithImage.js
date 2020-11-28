import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(selectorPopup){
        super(selectorPopup);
    }

    open(link, name){
        super.open();
        //console.log(this._popup);
        this._popup.querySelector('.photo-fullsize__image').src = link;
        this._popup.querySelector('.photo-fullsize__describe').textContent = name;
    }
}