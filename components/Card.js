export default class Card{
    constructor(data, handleCardClick){
        //console.log('Card data:');
        //console.log(data);
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._getView();
        this._elementImage = this._temp.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._temp.querySelector('.element__text').textContent = this._name;
        this._elementImage.alt = "Картинка";
        this._setEvents();

    }

    _getView(){
        this._temp = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);

        return this._temp;
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
            this._handleCardClick(this._link, this._name);
        });
    }

    returnTemplate(){
        return this._temp;
    }
}