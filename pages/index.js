import './index.css';

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



const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup_type_add-form');

const closeButtonAddForm = addForm.querySelector(".form__close-icon");

const userInfo = new UserInfo('.profile__full-name', '.profile__describe', 'full-name-input', 'bio-input', '.profile__avatar', 'avatarLink-input');
userInfo.setUserInfo(userInfo.getUserInfo());

const photoForm = new PopupWithImage('.popup_type_photo-form');
photoForm.setEventListeners();


const handleCardClick = (link, name) => {
    photoForm.open(link, name);
};

const deleteForm = new PopupWithForm('.popup_type_delete-form', () => {}, () => {});
deleteForm.setEventListeners();

const handleDeleteCardClick = (post, id) => {
    const submitDelete = (event, inputValues, submitElement) => {
        event.preventDefault();
        post.remove();
        submitElement.textContent = "Сохранение...";
        return apiUser.getFetchDelete('/cards/' + id);
    }
    
    deleteForm.setSubmitForm(submitDelete);
    deleteForm.open();
}
const handlePut = (st) => {
    return apiUser.getFetchPut(st);
}

const handleDelete = (st) => {
    return apiUser.getFetchDelete(st);
}

const cardFetch = () => {
    return apiUser.getFetch();
}

const createCard = (item) => {
    return new Card(item, handleCardClick, handleDeleteCardClick, handlePut, handleDelete, cardFetch);
}

const cardsList = new Section({
    items: [],
    renderer: (item) => {
        const card = createCard(item);
        return card.returnTemplate();
    }
}, '.elements');
cardsList.renderItems();

const setValuesEdit = () => {
    return userInfo.setInputInfo();
};

const apiUser = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4',
      'Content-Type': 'application/json'
    }
  });

apiUser.getFetch()
    .then((result) => {
        userInfo.setUserInfo(result);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

apiUser.getInitialCards()
    .then((data) => {
    console.log(data);
    data.forEach((item) => {
        const card  = createCard(item);
        cardsList.addItem(card.returnTemplate())
    });
})
.catch((err) => {
    console.log(err);
});


const submitEditForm = (event, inputValues, submitElement) => {
    event.preventDefault();
    submitElement.textContent = "Сохранение...";

    return apiUser.getFetchPatch('/users/me', JSON.stringify({
        name: inputValues.name,
        about: inputValues.bio
    }))
        .then((userData) => {
            //console.log(userData);
            userInfo.setUserInfo(userData);
        })
        .catch((err) => {
            console.log(err);
        });
    
}

const submitAddForm = (event, inputValues, submitElement) => {
    event.preventDefault();    
    submitElement.textContent = "Сохранение...";
    return apiUser.getFetchPost('/cards', JSON.stringify({
        name: inputValues.postName,
        link: inputValues.postLink
    }))
    .then((data) => {
        //console.log(data);
        return createCard(data);
    })
    .then((card) => {
        cardsList.addItem(card.returnTemplate());
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })

    //console.log(card.);
    
}

const formEdit = new PopupWithForm('.popup_type_edit-form', submitEditForm, setValuesEdit);
formEdit.setEventListeners();
editButton.addEventListener('click', function(){
    formEdit.open();
});


const formAdd = new PopupWithForm('.popup_type_add-form', submitAddForm);
formAdd.setEventListeners();

addButton.addEventListener('click', function(){
    //console.log('try1');
    formAdd.open();
});


const submitAvatarForm = (event, inputValues, submitElement) => {
    event.preventDefault();
    submitElement.textContent = "Сохранение...";
    
    return apiUser.getFetchPatch('/users/me/avatar', JSON.stringify({
        avatar: inputValues.avatarLink
    }))
        .then((userData) => {
            userInfo.setUserInfo(userData);
        })
        .catch((err) => {
            console.log(err);
        });

};

const avatarButton = document.querySelector('.profile__avatar-cover');
const formAvatar = new PopupWithForm('.popup_type_avatar-form', submitAvatarForm);
formAvatar.setEventListeners();
avatarButton.addEventListener('click', () => {
    formAvatar.open();
})