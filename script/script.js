function openPopup(popupElement){
    popupElement.classList.add('popup_opened');
}
function closePopup(popupElement){
    popupElement.classList.remove('popup_opened');
}


//EDIT
const editForm = document.querySelector('.popup_type_edit-form')
const editButton = document.querySelector(".profile__edit-button");

let name = document.querySelector('.profile__full-name');
let describe = document.querySelector('.profile__describe');

editButton.addEventListener('click', function(){
    openPopup(editForm);
    document.getElementById('full-name').value = name.textContent;
    document.getElementById('bio').value = describe.textContent;
});

editForm.querySelector(".form__close-icon").addEventListener('click', function(){
    closePopup(editForm);
});

function submitEditForm(evt){
    evt.preventDefault();

    name.textContent = document.getElementById('full-name').value;
    describe.textContent = document.getElementById('bio').value;

    closePopup(document.querySelector(".popup_type_edit-form"));
    console.log("close and save");
}

document.querySelector(".popup_type_edit-form").addEventListener('submit', submitEditForm, false);

//ADD
const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup_type_add-form');

addButton.addEventListener('click', function(){
    openPopup(document.querySelector('.popup_type_add-form'));
    document.getElementById('postName').value = "Название";
    document.getElementById('postLink').value = "Ссылка на картинку";
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
        name: document.getElementById('postName').value,
        link: document.getElementById('postLink').value
    }

    addElement(item);    

    closePopup(document.querySelector(".popup_type_add-form"));
    console.log("close and save");
}

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

let elements = document.querySelector('.elements');

initialCards.forEach(addElement);

function addElement(item){
    elements.prepend(createElement(item));
}

function createElement(item){
    const elementTemplate = document.querySelector('#element-template').content;
    const elem = elementTemplate.cloneNode(true);

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

