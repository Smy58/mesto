export default class FormValidator{
  constructor(formElement, allClasses){
    this._formElement = formElement;
    this._allClasses = allClasses;
    this._fieldsetList = Array.from(this._formElement.querySelectorAll(this._allClasses.fieldset));
  }

  setEvents(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset, this._allClasses);
    });
  }

  _setEventListeners(formElement, allClasses){
    this._inputList = Array.from(formElement.querySelectorAll(allClasses.input));
    this._buttonElement = formElement.querySelector(allClasses.submitButton);
    formElement.addEventListener('reset', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(formElement, inputElement, allClasses);
        this._toggleButtonState( this._inputList, this._buttonElement, allClasses);
      })
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, allClasses);
        this._toggleButtonState(this._inputList, this._thisbuttonElement, allClasses);
      });
      this._checkInputValidity(formElement, inputElement, allClasses);
      this._toggleButtonState(this._inputList, this._buttonElement, allClasses);
    });
  };

  _toggleButtonState(inputList, buttonElement, allClasses){
    //console.log(" che che1 " + allClasses.submitButtonDisabled);
    if(this._hasInvalidInput(inputList)){
      //console.log(buttonElement);
      this._buttonElement.classList.add(allClasses.submitButtonDisabled);
      this._buttonElement.disabled = true;
    }else{
      this._buttonElement.classList.remove(allClasses.submitButtonDisabled);
      this._buttonElement.disabled = false;
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
    //console.log(inputElement.id);
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

