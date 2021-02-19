import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(selectorPopup, submitForm){
        super(selectorPopup);
        this._submitForm = submitForm;
        this._popForm = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._submitButton = this._popup.querySelector('.form__submit');
    }

    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    setSubmitForm(newSubmitForm){
        this._submitForm = newSubmitForm;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            this._submitForm(event, this._getInputValues(), this._submitButton)
                .finally(() => {
                    this._submitButton.textContent = "Сохранить";
                    this.closePopup();
                })
            
        }, false);
    }

    closePopup(){
        super.closePopup();
        this._popForm.reset();
    }
}