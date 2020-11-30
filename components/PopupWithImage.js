import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(selectorPopup){
        super(selectorPopup);
        this._popupCardImage = this._popup.querySelector('.photo-fullsize__image');
        this._captionImage = this._popup.querySelector('.photo-fullsize__describe');

    }

    open(link, name){
        super.open();
        //console.log(this._popup);
        this._popupCardImage.src = link;
        this._captionImage.textContent = name;
    }
}