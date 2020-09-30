let form = document.querySelector(".form");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".form__close-icon");

let editForm = document.querySelector('.edit-form');

let inputName = document.getElementById('full-name');
let inputDescribe = document.getElementById('bio');

let name = document.querySelector('.profile__full-name');
let describe = document.querySelector('.profile__describe');

function submit(evt){
    evt.preventDefault();

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

form.addEventListener('submit', submit, false);
editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeForm);