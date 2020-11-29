import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
const userInfo = new UserInfo('.profile__full-name', '.profile__describe');

export default class PopupWithForm extends Popup{
    constructor(selectorPopup, submitForm){
        super(selectorPopup);
        const validateForm = new FormValidator(document.querySelector(selectorPopup));
        this._submitForm = submitForm;
        document.getElementById('postName-input').value = "";
        document.getElementById('postLink-input').value = "Не ссылка";
        document.getElementById('full-name-input').value = userInfo.getUserInfo().name;
        document.getElementById('bio-input').value = userInfo.getUserInfo().describe;
    }

    _getInputValues(){
        return {
            name: document.getElementById('full-name-input').value, 
            describe: document.getElementById('bio-input').value, 
            postName: document.getElementById('postName-input').value, 
            postLink: document.getElementById('postLink-input').value
        };
    }

    setEventListeners(){
        super.setEventListeners();
        console.log('try to submit');
        this._popup.addEventListener('submit', (event) => {
            console.log("tt");
            this._submitForm(event, this._getInputValues());
            this.closePopup();
        }, false);
    }

    closePopup(){
        
        super.closePopup();

        document.getElementById('postName-input').value = "";
        document.getElementById('postLink-input').value = "Не ссылка";
        document.getElementById('full-name-input').value = userInfo.getUserInfo().name;
        document.getElementById('bio-input').value = userInfo.getUserInfo().describe;
        
        console.log('kill me');
    }
}