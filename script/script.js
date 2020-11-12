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

function closePopup(popupElement){
    popupElement.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(evt){
    //console.log(evt.key);
    if(evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popupElement, allClasses){
    popupElement.classList.add('popup_opened');
    document.body.addEventListener('keydown', handleKeyDown);
}

function submitEditForm(evt){
    evt.preventDefault();

    name.textContent = inpName.value;
    describe.textContent = inpBio.value;

    closePopup(editForm);
    console.log("close and save");
}



function createElement(item){
    const card = new Card(item.name, item.link);
    //console.log(card.returnTemplate());
    return card.returnTemplate();
}

function addElement(item, elementsList){
    elementsList.prepend(createElement(item));
    //console.log(elementsList);
}

function submitAddForm(evt){
    evt.preventDefault();
    console.log("TRUE");
    const item = {
        name: inpPostName.value,
        link: inpLink.value
    }

    addElement(item, listOfElements);    

    closePopup(addForm);
    console.log("close and save");
}


document.querySelectorAll('.popup').forEach(function(item){
    item.addEventListener('click', function(evt){
        if(evt.target.classList.contains('popup')){
            closePopup(item);
        }
    });
});

editButton.addEventListener('click', function(){
    inpName.value = name.textContent;
    inpBio.value = describe.textContent;
    openPopup(editForm, allClasses);
    //refreshValidate(editForm);
    
});

editForm.querySelector(".form__close-icon").addEventListener('click', function(){
    closePopup(editForm);
});

editForm.addEventListener('submit', submitEditForm, false);


initialCards.forEach(function(item){
    addElement(item, listOfElements);
});

addButton.addEventListener('click', function(){
    inpPostName.value = "";
    inpLink.value = "Не ссылка";
    openPopup(addForm, allClasses);
    //refreshValidate(addForm);
});

closeButtonAddForm.addEventListener('click', function(){
    closePopup(addForm);
});

addForm.addEventListener('submit', submitAddForm, false);