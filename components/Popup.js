export default class Popup{
    constructor(selectorPopup){
        this._popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.body.addEventListener('keydown', this._handleEscClose);
    }
    closePopup(){
        this._popup.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        //console.log(evt.key);
        if(evt.key === 'Escape'){
            //console.log(this);
            this.closePopup();
        }
    }

    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            //console.log('tratatatata');
            if(evt.target.classList.contains('popup')){
                this.closePopup();
            }
        });
        //console.log(this._popup);
        this._popup.querySelector(".popup__close-button").addEventListener('click', () => {
            this.closePopup();
        });
    }

}