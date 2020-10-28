const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    console.log(inputElement.id);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        //console.log(inputElement.validationMessage);
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

function hasInvalidInput(inputList){
    return inputList.some(function(input){
      return !input.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add('form__submit_inactive');
    }else{
      buttonElement.classList.remove('form__submit_inactive');
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach(function(fieldset){
      setEventListeners(fieldset);
    })
  });
};

enableValidation();




function closePopup(popupElement){
    popupElement.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt){
    if(evt.key === 'Escape'){
        document.querySelectorAll('.popup').forEach(function(item){
            if(item.classList.contains('popup_opened')){
                closePopup(item);
            }
        })
    }
}

function openPopup(popupElement){
    popupElement.classList.add('popup_opened');
    if(popupElement.classList.contains('popup_type_edit-form') || popupElement.classList.contains('popup_type_add-form')){
        const formElement = popupElement.querySelector('.form');
        const inputList = Array.from(formElement.querySelectorAll('.form__input'));
        const buttonElement = formElement.querySelector('.form__submit');
        inputList.forEach(function(item){
            console.log(item.value);
        });
        toggleButtonState(inputList, buttonElement);
    }

    document.body.addEventListener('keydown', keyHandler);
    
    popupElement.addEventListener('click', function(evt){
        if(evt.target.classList.contains('popup')){
            closePopup(popupElement);
        }
    })
}

//EDIT
const editForm = document.querySelector('.popup_type_edit-form')
const editButton = document.querySelector(".profile__edit-button");

const name = document.querySelector('.profile__full-name');
const describe = document.querySelector('.profile__describe');

editButton.addEventListener('click', function(){
    openPopup(editForm);
    document.getElementById('full-name-input').value = name.textContent;
    document.getElementById('bio-input').value = describe.textContent;
});

editForm.querySelector(".form__close-icon").addEventListener('click', function(){
    closePopup(editForm);
});

function submitEditForm(evt){
    evt.preventDefault();

    name.textContent = document.getElementById('full-name-input').value;
    describe.textContent = document.getElementById('bio-input').value;

    closePopup(document.querySelector(".popup_type_edit-form"));
    console.log("close and save");
}

document.querySelector(".popup_type_edit-form").addEventListener('submit', submitEditForm, false);

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

function createElement(item){
    const elementTemplate = document.querySelector('#element-template').content;
    const elem = elementTemplate.querySelector('.element').cloneNode(true);

    elem.querySelector('.element__image').src = item.link;
    elem.querySelector('.element__text').textContent = item.name;

    const likeButton = elem.querySelector('.element__like-button');

    likeButton.addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like-button_isActive_true');
    });

    const deleteButton = elem.querySelector('.element__trash');

    deleteButton.addEventListener('click', function (){
        const post = deleteButton.closest('.element');

        post.remove();
    });

    //Full-size

    const fullSizeButton = elem.querySelector('.element__button-image');

    fullSizeButton.addEventListener('click', function(){
        const photoForm = document.querySelector('.popup_type_photo-form');
        openPopup(photoForm);

        photoForm.querySelector('.photo-fullsize__image').src = item.link;
        photoForm.querySelector('.photo-fullsize__describe').textContent = item.name;

        photoForm.querySelector('.photo-fullsize__close-icon').addEventListener('click', function(){
            closePopup(photoForm);
        });
        
    });

    return elem;
}

function addElement(item, elementsList){
    elementsList.prepend(createElement(item));
    //console.log(elementsList);
}

initialCards.forEach(function(item){
    addElement(item, document.querySelector('.elements'));
});

//ADD
const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup_type_add-form');

addButton.addEventListener('click', function(){
    document.getElementById('postName-input').value = "Название";
    document.getElementById('postLink-input').value = "Ссылка на картинку";
    openPopup(document.querySelector('.popup_type_add-form'));
});

const closeButtonAddForm = addForm.querySelector(".form__close-icon");

closeButtonAddForm.addEventListener('click', function(){
    closePopup(document.querySelector('.popup_type_add-form'));
});

document.querySelector('.popup_type_add-form').addEventListener('submit', submitAddForm, false);

function submitAddForm(evt){
    evt.preventDefault();
    console.log("TRUE");
    const item = {
        name: document.getElementById('postName-input').value,
        link: document.getElementById('postLink-input').value
    }

    addElement(item, document.querySelector('.elements'));    

    closePopup(document.querySelector(".popup_type_add-form"));
    console.log("close and save");
}

