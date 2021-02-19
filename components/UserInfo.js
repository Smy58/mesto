export default class UserInfo{
    constructor(nameSelector, describeSelector, nameInputSelector, describeInputSelector, avatarSelector, avatarInputSelector){
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;
        this._avatarSelector = avatarSelector;
        this._nameInputSelector = nameInputSelector;
        this._describeInputSelector = describeInputSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._describeElement = document.querySelector(this._describeSelector);
        this._avatarElement = document.querySelector(this._avatarSelector);
        this._nameInputElement = document.getElementById(nameInputSelector);
        this._describeInputElement = document.getElementById(describeInputSelector);
        this._avatarInputElement = document.getElementById(avatarInputSelector);
        this.setUserInfo(this.getUserInfo());
        
    }

    getUserInfo(){
        //console.log(this._describeElement.textContent);
        return {
            name: this._nameElement.textContent,
            about: this._describeElement.textContent,
            avatar: this._avatarElement.src
        }
    }
    setUserInfo(data){
        this._nameElement.textContent = data.name;
        this._describeElement.textContent = data.about;
        this._nameInputElement.value = data.name;
        this._describeInputElement.value = data.about;
        this._avatarElement.src = data.avatar;
        this._avatarInputElement = data.avatar;

    }

    setInputInfo(){
        this.setUserInfo(this.getUserInfo());
    }
}