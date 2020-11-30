import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(selectorPopup, submitForm, setValues){
        super(selectorPopup);
        this._submitForm = submitForm;
        this._setValues = setValues;
        this._setValues();
        this._inputList = this._popup.querySelectorAll('.form__input');
    }

    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        //console.log("try1");
        this._popup.addEventListener('submit', (event) => {
            //console.log("tt");
            this._submitForm(event, this._getInputValues());
            this.closePopup();
        }, false);
    }

    closePopup(){
        super.closePopup();
        this._popup.querySelector('.form').reset();
        this._setValues();
        //console.log('kill me');
    }
}