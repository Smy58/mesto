class FormValidator{
  constructor(formElement){
    this._formElement = formElement;
    this._fieldsetList = Array.from(this._formElement.querySelectorAll(allClasses.fieldset));
    this._setEvents();
  }

  _setEvents(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset, allClasses);
    });
  }

  _setEventListeners(formElement, allClasses){
    this._inputList = Array.from(formElement.querySelectorAll(allClasses.input));
    this._buttonElement = formElement.querySelector(allClasses.submitButton);
    this._toggleButtonState(this._inputList, this._buttonElement, allClasses);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, allClasses);
        this._toggleButtonState(this._inputList, this._thisbuttonElement, allClasses);
      });
    });
  };

  _toggleButtonState(inputList, buttonElement, allClasses){
    console.log(" che che1 " + allClasses.submitButtonDisabled);
    if(this._hasInvalidInput(inputList)){
      //console.log(buttonElement);
      this._buttonElement.classList.add(allClasses.submitButtonDisabled);
    }else{
      this._buttonElement.classList.remove(allClasses.submitButtonDisabled);
    }
  }

  _hasInvalidInput(inputList){
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }
  
  _checkInputValidity(formElement, inputElement, allClasses){
    if (!inputElement.validity.valid) {
        //console.log(inputElement.validationMessage);
        this._showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
    } else {
        this._hideInputError(formElement, inputElement, allClasses);
    }
  }

  _showInputError(formElement, inputElement, errorMessage, allClasses){
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(allClasses.inputTypeError);
    console.log(inputElement.id);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(allClasses.errorText);
  };

  _hideInputError(formElement, inputElement, allClasses){
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(allClasses.inputTypeError);
    this._errorElement.classList.remove(allClasses.errorText);
    this._errorElement.textContent = '';
  };
}

const allClasses = {
    form: '.form',
    fieldset: '.form__set',
    input: '.form__input',
    submitButton: '.form__submit',
    submitButtonDisabled: 'form__submit_inactive',
    inputTypeError: 'form__input_type_error',
    errorText: 'form__input-error_active'
}


const enableValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.form));
  formList.forEach((formElement) => {
    const formvalidate = new FormValidator(formElement);
    
  });
};

enableValidation(allClasses);