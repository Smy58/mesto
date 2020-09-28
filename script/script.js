let submitButton = document.querySelector(".form__submit");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".edit-form__close-icon");

function closeAndSave(){
    let editForm = document.querySelector('.edit-form');

    let inputName = document.querySelector('.form__input_option_name');
    let inputDescribe = document.querySelector('.form__input_option_describe');
    
    let name = document.querySelector('.profile__fullName');
    let describe = document.querySelector('.profile__describe');

    name.textContent = inputName.value;
    describe.textContent = inputDescribe.value;

    editForm.classList.add('edit-form_view_hidden');
    console.log("close and save");
}

function openEditForm(){
    let editForm = document.querySelector('.edit-form');
    editForm.classList.remove('edit-form_view_hidden');

    let inputName = document.querySelector('.form__input_option_name');
    let inputDescribe = document.querySelector('.form__input_option_describe');
    
    let name = document.querySelector('.profile__fullName');
    let describe = document.querySelector('.profile__describe');

    inputName.value = name.textContent;
    inputDescribe.value = describe.textContent;
}

function closeForm(){
    let editForm = document.querySelector('.edit-form');
    editForm.classList.add('edit-form_view_hidden');
}

submitButton.addEventListener('click', closeAndSave);
editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeForm);