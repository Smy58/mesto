//import './index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';

const editForm = document.querySelector('.popup_type_edit-form')
const editButton = document.querySelector(".profile__edit-button");

const name = document.querySelector('.profile__full-name');
const describe = document.querySelector('.profile__describe');


const inpName = document.getElementById('full-name-input');
const inpBio = document.getElementById('bio-input');

const inpPostName = document.getElementById('postName-input');
const inpLink = document.getElementById('postLink-input');

const listOfElements = document.querySelector('.elements');

export const allClasses = {
    form: '.form',
    fieldset: '.form__set',
    input: '.form__input',
    submitButton: '.form__submit',
    submitButtonDisabled: 'form__submit_inactive',
    inputTypeError: 'form__input_type_error',
    errorText: 'form__input-error_active'
}


const enableValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.form));
  formList.forEach((formElement) => {
    const formvalidate = new FormValidator(formElement, allClasses);
    formvalidate.setEvents();
  });
};

enableValidation(allClasses);


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup_type_add-form');

const closeButtonAddForm = addForm.querySelector(".form__close-icon");

const userInfo = new UserInfo('.profile__full-name', '.profile__describe');
userInfo.setUserInfo(userInfo.getUserInfo());

const photoForm = new PopupWithImage('.popup_type_photo-form');
photoForm.setEventListeners();

const handleCardClick = (link, name) => {
    photoForm.open(link, name);
};

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        //console.log(item);
        const card = new Card(item, handleCardClick);
        return card.returnTemplate();
    }
}, '.elements');
cardsList.renderItems();


const submitEditForm = (event, inputValues) => {
    event.preventDefault();
    
    userInfo.setUserInfo({
        name: inputValues.name,
        describe: inputValues.bio
    });
    alert('MOLODEC');
    //console.log("close and save");
}

const submitAddForm = (event, inputValues) => {
    event.preventDefault();
    const itemNew = {
        name: inputValues.postName,
        link: inputValues.postLink
    }
    
    const card = new Card(itemNew, handleCardClick);
 
    //console.log(card.);
    cardsList.addItem(card.returnTemplate());
}

const setValuesEdit = () => {
    //console.log(userInfo.getUserInfo.name);
    document.getElementById('full-name-input').value = userInfo.getUserInfo().name;
    document.getElementById('bio-input').value = userInfo.getUserInfo().describe;
};

const formEdit = new PopupWithForm('.popup_type_edit-form', submitEditForm, setValuesEdit);
formEdit.setEventListeners();
editButton.addEventListener('click', function(){
    formEdit.open();
});


const setValuesAdd = () => {
    document.getElementById('postName-input').value = "";
    document.getElementById('postLink-input').value = "";
};
const formAdd = new PopupWithForm('.popup_type_add-form', submitAddForm, setValuesAdd);
formAdd.setEventListeners();

addButton.addEventListener('click', function(){
    //console.log('try1');
    formAdd.open();
});