export default class Card{
    constructor(data, handleCardClick, handleDeleteCardClick, handlePut, handleDelete, cardFetch){
        this._clickNumber = 0;
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerID = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handlePut = handlePut;
        this._handleDelete = handleDelete;
        this._cardFetch = cardFetch;
        this._getView();
        this._elementImage = this._temp.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._temp.querySelector('.element__text').textContent = this._name;
        this._temp.querySelector('.element__like-number').textContent = this._likes.length;
        this._elementImage.alt = "Картинка";
        this._setEvents();
    }

    _getView(){
        this._temp = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
        this._cardFetch()
            .then((data) => {
                if(data._id == this._ownerID){
                    this._temp.querySelector('.element__trash').style.display = 'block';
                }
                this._likes.forEach(like => {
                    if(like._id == data._id){
                        this._temp.querySelector('.element__like-button').classList.toggle('element__like-button_isActive_true');
                        this._clickNumber = -1;
                    }
                    
                });
            })
        return this._temp;
    }

    _setEvents(){
        const likeButton = this._temp.querySelector('.element__like-button');

        likeButton.addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like-button_isActive_true');
            if(evt.target.classList.contains('element__like-button_isActive_true')){
                this._handlePut('/cards/likes/' + this._id);
                this._temp.querySelector('.element__like-number').textContent = this._likes.length + 1 + this._clickNumber;
            }else{
                this._handleDelete('/cards/likes/' + this._id);
                this._temp.querySelector('.element__like-number').textContent = this._likes.length + this._clickNumber;
            }

        });

        const deleteButton = this._temp.querySelector('.element__trash');

        deleteButton.addEventListener('click', () => {
            this._handleDeleteCardClick(deleteButton.closest('.element'), this._id);
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