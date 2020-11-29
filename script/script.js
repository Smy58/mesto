import './../pages/index.css';

import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

const editForm = document.querySelector('.popup_type_edit-form')
const editButton = document.querySelector(".profile__edit-button");

const name = document.querySelector('.profile__full-name');
const describe = document.querySelector('.profile__describe');


const inpName = document.getElementById('full-name-input');
const inpBio = document.getElementById('bio-input');

const inpPostName = document.getElementById('postName-input');
const inpLink = document.getElementById('postLink-input');

const listOfElements = document.querySelector('.elements');


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

const handleCardClick = (link, name) => {
    const photoForm = new PopupWithImage('.popup_type_photo-form');
    photoForm.open(link, name);    
    photoForm.setEventListeners();
};


const submitEditForm = (event, inputValues) => {
    event.preventDefault();
    const userInfo = new UserInfo('.profile__full-name', '.profile__describe');
    userInfo.setUserInfo({
        name: inputValues.name,
        describe: inputValues.describe
    });

    console.log("close and save");
}

const submitAddForm = (event, inputValues) => {
    event.preventDefault();
    const itemNew = {
        name: inputValues.postName,
        link: inputValues.postLink
    }
    const arr = [itemNew]
    console.log("_____________");
    console.log(arr);
    const newCardList = new Section({
        items: arr,
        renderer: () => {
            //console.log('+++++');
            //console.log(itemNew);
            const card = new Card(itemNew, handleCardClick);
            return card.returnTemplate();
        }
    }, '.elements');
    console.log('please');
}

const formEdit = new PopupWithForm('.popup_type_edit-form', submitEditForm);
formEdit.setEventListeners();
editButton.addEventListener('click', function(){
    formEdit.open();
});


const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        //console.log(item);
        const card = new Card(item, handleCardClick);
        return card.returnTemplate();
    }
}, '.elements');

const formAdd = new PopupWithForm('.popup_type_add-form', submitAddForm);
formAdd.setEventListeners();
addButton.addEventListener('click', function(){
    //console.log('try1');
    formAdd.open();
});