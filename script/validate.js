const allClasses = {
    form: '.form',
    fieldset: '.form__set',
    input: '.form__input',
    submitButton: '.form__submit',
    submitButtonDisabled: 'form__submit_inactive',
    inputTypeError: 'form__input_type_error',
    errorText: 'form__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, allClasses) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(allClasses.inputTypeError);
    console.log(inputElement.id);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(allClasses.errorText);
};

const hideInputError = (formElement, inputElement, allClasses) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(allClasses.inputTypeError);
    errorElement.classList.remove(allClasses.errorText);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, allClasses) => {
    if (!inputElement.validity.valid) {
        //console.log(inputElement.validationMessage);
        showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
    } else {
        hideInputError(formElement, inputElement, allClasses);
    }
};

function hasInvalidInput(inputList){
    return inputList.some(function(input){
      return !input.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, allClasses){
    console.log(" che che " + allClasses.submitButtonDisabled);
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(allClasses.submitButtonDisabled);
    }else{
      buttonElement.classList.remove(allClasses.submitButtonDisabled);
    }
}

const setEventListeners = (formElement, allClasses) => {
    const inputList = Array.from(formElement.querySelectorAll(allClasses.input));
    const buttonElement = formElement.querySelector(allClasses.submitButton);
    toggleButtonState(inputList, buttonElement, allClasses);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, allClasses);
        toggleButtonState(inputList, buttonElement, allClasses);
      });
    });
};

const enableValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.form));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(allClasses.fieldset));
    fieldsetList.forEach(function(fieldset){
      setEventListeners(fieldset, allClasses);
    })
  });
};

enableValidation(allClasses);