const editForm = document.querySelector('.popup_type_edit-form')
const editButton = document.querySelector(".profile__edit-button");

const name = document.querySelector('.profile__full-name');
const describe = document.querySelector('.profile__describe');

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

function submitEditForm(evt){
    evt.preventDefault();

    name.textContent = document.getElementById('full-name-input').value;
    describe.textContent = document.getElementById('bio-input').value;

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
        name: document.getElementById('postName-input').value,
        link: document.getElementById('postLink-input').value
    }

    addElement(item, document.querySelector('.elements'));    

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
    document.getElementById('full-name-input').value = name.textContent;
    document.getElementById('bio-input').value = describe.textContent;
    openPopup(editForm, allClasses);
    //refreshValidate(editForm);
    
});

editForm.querySelector(".form__close-icon").addEventListener('click', function(){
    closePopup(editForm);
});

editForm.addEventListener('submit', submitEditForm, false);


initialCards.forEach(function(item){
    addElement(item, document.querySelector('.elements'));
});

addButton.addEventListener('click', function(){
    document.getElementById('postName-input').value = "";
    document.getElementById('postLink-input').value = "Не ссылка";
    openPopup(addForm, allClasses);
    //refreshValidate(addForm);
});

closeButtonAddForm.addEventListener('click', function(){
    closePopup(addForm);
});

addForm.addEventListener('submit', submitAddForm, false);