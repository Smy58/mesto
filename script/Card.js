class Card{
    constructor(name, link){
        this._name = name;
        this._link = link;
        this._temp = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
        this._temp.querySelector('.element__image').src = this._link;
        this._temp.querySelector('.element__text').textContent = this._name;
        //console.log(this._temp.querySelector('.element__text').textContent + " " + this._name);
        this._setEvents();
    }

    _setEvents(){
        const likeButton = this._temp.querySelector('.element__like-button');

        likeButton.addEventListener('click', function(evt){
            evt.target.classList.toggle('element__like-button_isActive_true');
        });

        const deleteButton = this._temp.querySelector('.element__trash');

        deleteButton.addEventListener('click', function (){
            const post = deleteButton.closest('.element');

            post.remove();
        });

        //Full-size

        const fullSizeButton = this._temp.querySelector('.element__button-image');

        fullSizeButton.addEventListener('click', () => {
            const photoForm = document.querySelector('.popup_type_photo-form');
            openPopup(photoForm, allClasses);

            photoForm.querySelector('.photo-fullsize__image').src = this._link;
            photoForm.querySelector('.photo-fullsize__describe').textContent = this._name;

            photoForm.querySelector('.photo-fullsize__close-icon').addEventListener('click', function(){
                closePopup(photoForm);
            });
            
        });
    }

    returnTemplate(){
        return this._temp;
    }
}