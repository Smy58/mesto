let submitButton = document.querySelector(".form__submit");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".edit-form__close-icon");

let editForm = document.querySelector('.edit-form');

let inputName = document.getElementById('full-name');
let inputDescribe = document.getElementById('bio');

let name = document.querySelector('.profile__full-name');
let describe = document.querySelector('.profile__describe');

function submit(){
    name.textContent = inputName.value;
    describe.textContent = inputDescribe.value;

    editForm.classList.add('edit-form_view_hidden');
    console.log("close and save");
}

function openEditForm(){
    editForm.classList.remove('edit-form_view_hidden');

    inputName.value = name.textContent;
    inputDescribe.value = describe.textContent;
}

function closeForm(){
    editForm.classList.add('edit-form_view_hidden');
}

submitButton.addEventListener('click', submit);
editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeForm);