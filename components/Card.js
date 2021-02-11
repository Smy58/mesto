export default class Card{
    constructor(data, handleCardClick, handleDeleteCardClick){
        this._clickNumber = 0;
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerID = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
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
        fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
            headers: {
                authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4'
            }
        })
            .then(res => res.json())
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
                fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards/likes/' + this._id, {
                method: 'PUT',
                headers: {
                    authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4'
                }
                })
                .then(res => res.json())
                .then((data) => {
                    //console.log(data);
                });
                this._temp.querySelector('.element__like-number').textContent = this._likes.length + 1 + this._clickNumber;
            }else{
                fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards/likes/' + this._id, {
                method: 'DELETE',
                headers: {
                    authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4'
                }
                })
                .then(res => res.json())
                .then((data) => {
                    //console.log(data);
                });
                this._temp.querySelector('.element__like-number').textContent = this._likes.length + this._clickNumber;
            }

        });

        const deleteButton = this._temp.querySelector('.element__trash');

        deleteButton.addEventListener('click', () => {
            this._handleDeleteCardClick(deleteButton.closest('.element'));
            fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards/' + this._id, {
            method: 'DELETE',
            headers: {
                authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4'
            }
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
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