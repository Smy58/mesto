
function closePopup(popupElement){
    popupElement.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(popupElement){
    return function(evt){
        if(evt.key === 'Escape'){
            closePopup(popupElement);
        }
    }
}

function openPopup(popupElement, allClasses){
    popupElement.classList.add('popup_opened');

    document.body.addEventListener('keydown', handleKeyDown(popupElement));
}

document.querySelectorAll('.popup').forEach(function(item){
    item.addEventListener('click', function(evt){
        if(evt.target.classList.contains('popup')){
            closePopup(item);
        }
    });
})

function refreshValidate(popupElement){
    const formElement = popupElement.querySelector('.form');
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    
    inputList.forEach(function(inputElement){
        checkInputValidity(formElement, inputElement, allClasses);
    });

    toggleButtonState(inputList, buttonElement, allClasses);
}

//EDIT
const editForm = document.querySelector('.popup_type_edit-form')
const editButton = document.querySelector(".profile__edit-button");

const name = document.querySelector('.profile__full-name');
const describe = document.querySelector('.profile__describe');

editButton.addEventListener('click', function(){
    document.getElementById('full-name-input').value = name.textContent;
    document.getElementById('bio-input').value = describe.textContent;
    openPopup(editForm, allClasses);
    refreshValidate(editForm);
    
});

editForm.querySelector(".form__close-icon").addEventListener('click', function(){
    closePopup(editForm);
});

function submitEditForm(evt){
    evt.preventDefault();

    name.textContent = document.getElementById('full-name-input').value;
    describe.textContent = document.getElementById('bio-input').value;

    closePopup(editForm);
    console.log("close and save");
}

editForm.addEventListener('submit', submitEditForm, false);

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
        openPopup(photoForm, allClasses);

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
    document.getElementById('postName-input').value = "";
    document.getElementById('postLink-input').value = "Не ссылка";
    openPopup(addForm, allClasses);
    refreshValidate(addForm);
});

const closeButtonAddForm = addForm.querySelector(".form__close-icon");

closeButtonAddForm.addEventListener('click', function(){
    closePopup(addForm);
});

addForm.addEventListener('submit', submitAddForm, false);

function submitAddForm(evt){
    evt.preventDefault();
    console.log("TRUE");
    const item = {
        name: document.getElementById('postName-input').value,
        link: document.getElementById('postLink-input').value
    }

    addElement(item, document.querySelector('.elements'));    

    closePopup(addForm);
    console.log("close and save");
}

