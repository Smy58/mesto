export default class Popup{
    constructor(selectorPopup){
        this._popup = document.querySelector(selectorPopup);
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.body.addEventListener('keydown', this._handleEscClose);
    }
    closePopup(){
        this._popup.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup')){
                this.closePopup();
            }
        });
        //console.log(this._popup);
        this._popup.querySelector(".popup__close-button").addEventListener('click', () => {
            //console.log(this.closePopup);
            this.closePopup();
        });
    }

    _handleEscClose(evt){
        //console.log(evt.key);
        if(evt.key === 'Escape'){
            this.closePopup();
        }
    }
}