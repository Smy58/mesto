let formTypeEdit = document.querySelector(".form_type_edit");
let formTypeAdd = document.querySelector(".form_type_add");

let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

let editForm = document.querySelector('.edit-form');
let addForm = document.querySelector('.add-form');

let closeButtonEditForm = editForm.querySelector(".form__close-icon");
let closeButtonAddForm = addForm.querySelector(".form__close-icon");

let inputName = document.getElementById('full-name');
let inputDescribe = document.getElementById('bio');

let inputPostName = document.getElementById('postName');
let inputPostLink = document.getElementById('postLink');

let name = document.querySelector('.profile__full-name');
let describe = document.querySelector('.profile__describe');

function submitEditForm(evt){
    evt.preventDefault();

    name.textContent = inputName.value;
    describe.textContent = inputDescribe.value;

    editForm.classList.add('edit-form_view_hidden');
    console.log("close and save");
}

function submitAddForm(evt){
    evt.preventDefault();

    let item = {
        name: inputPostName.value,
        link: inputPostLink.value
    }

    addElement(item);    

    addForm.classList.add('add-form_view_hidden');
    console.log("close and save");
}

function openEditForm(){
    editForm.classList.remove('edit-form_view_hidden');

    inputName.value = name.textContent;
    inputDescribe.value = describe.textContent;
}

function openAddForm(){
    addForm.classList.remove('add-form_view_hidden');

    inputPostName.value = "Название";
    inputPostLink.value = "Ссылка на картинку";
}

function openPhotoForm(item){
    const photoForm = document.querySelector('.photo-form');
    photoForm.classList.remove('photo-form_view_hidden');

    photoForm.querySelector('.photo-fullsize__image').src = item.link;
    photoForm.querySelector('.photo-fullsize__describe').textContent = item.name;

    photoForm.querySelector('.photo-fullsize__close-icon').addEventListener('click', function(){
        photoForm.classList.add('photo-form_view_hidden');
    });
}

function closeEditForm(){
    editForm.classList.add('edit-form_view_hidden');
}

function closeAddForm(){
    addForm.classList.add('add-form_view_hidden');
}



formTypeEdit.addEventListener('submit', submitEditForm, false);
formTypeAdd.addEventListener('submit', submitAddForm, false);

editButton.addEventListener('click', openEditForm);
addButton.addEventListener('click', openAddForm);
closeButtonEditForm.addEventListener('click', closeEditForm);
closeButtonAddForm.addEventListener('click', closeAddForm);

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

    const fullSizeButton = elem.querySelector('.element__button-image');

    fullSizeButton.addEventListener('click', function(){
        const photoForm = document.querySelector('.photo-form');
        photoForm.classList.remove('photo-form_view_hidden');

        photoForm.querySelector('.photo-fullsize__image').src = item.link;
        photoForm.querySelector('.photo-fullsize__describe').textContent = item.name;

        photoForm.querySelector('.photo-fullsize__close-icon').addEventListener('click', function(){
            photoForm.classList.add('photo-form_view_hidden');
        });
        
    });

    elements.prepend(elem);
}

