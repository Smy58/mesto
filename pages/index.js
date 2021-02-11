//import './index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

const editButton = document.querySelector(".profile__edit-button");

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




/*const initialCards = [
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
];*/

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


const handleDeleteCardClick = (post) => {
    const submitDelete = (event) => {
        event.preventDefault();
        post.remove();
    }
    
    const deleteForm = new PopupWithForm('.popup_type_delete-form', submitDelete, () => {});
    deleteForm.setEventListeners();
    deleteForm.open();
}

const cardsList = new Section({
    items: [],
    renderer: (item) => {
        //console.log(item);
        const card = new Card(item, handleCardClick, handleDeleteCardClick);
        return card.returnTemplate();
    }
}, '.elements');
cardsList.renderItems();

const apiUser = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4',
      'Content-Type': 'application/json'
    }
  });

apiUser.getFetch()
    .then((result) => {
        document.querySelector('.profile__full-name').textContent = result.name;
        document.querySelector('.profile__describe').textContent = result.about;
        document.getElementById('full-name-input').value = result.name;
        document.getElementById('bio-input').value = result.about;
        document.querySelector('.profile__avatar').src = result.avatar;
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })

const list = new Section({
    items: [],
    renderer: (item) => {
        const card = new Card(item, handleCardClick, handleDeleteCardClick);
        return card.returnTemplate();
    }
}, '.elements');

apiUser.getInitialCards()
    .then((data) => {
    console.log(data);
    const newList = new Section({
        items: data,
        renderer: (item) => {
            const card = new Card(item, handleCardClick, handleDeleteCardClick);
            return card.returnTemplate();
        }
    }, '.elements');
    newList.renderItems();
})


const submitEditForm = (event, inputValues, submitElement) => {
    event.preventDefault();
    submitElement.textContent = "Сохранение...";
    userInfo.setUserInfo({
        name: inputValues.name,
        describe: inputValues.bio
    });
    return apiUser.getFetchPatch('/users/me', JSON.stringify({
        name: inputValues.name,
        about: inputValues.bio
    }));
    
}

const submitAddForm = (event, inputValues, submitElement) => {
    event.preventDefault();    
    submitElement.textContent = "Сохранение...";
    return apiUser.getFetchPost('/cards', JSON.stringify({
        name: inputValues.postName,
        link: inputValues.postLink
    }))
    .then((data) => {
        return new Card(data, handleCardClick, handleDeleteCardClick);
    })
    .then((card) => {
        cardsList.addItem(card.returnTemplate());
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })

    //console.log(card.);
    
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



const ava = document.querySelector('.profile__avatar');
const submitAvatarForm = (event, inputValues, submitElement) => {
    event.preventDefault();
    submitElement.textContent = "Сохранение...";
    const newLink = inputValues.avatarLink;
    document.querySelector('.profile__avatar').src = newLink;
    return apiUser.getFetchPatch('/users/me/avatar', JSON.stringify({
        avatar: newLink
    }));
};
const setValuesAvatar = () => {
    document.getElementById('avatarLink-input').value = "";
};

const avatarButton = document.querySelector('.profile__avatar-cover');
const formAvatar = new PopupWithForm('.popup_type_avatar-form', submitAvatarForm, setValuesAvatar);
formAvatar.setEventListeners();
avatarButton.addEventListener('click', () => {
    formAvatar.open();
})