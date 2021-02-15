export default class UserInfo{
    constructor(nameSelector, describeSelector, nameInputSelector, describeInputSelector){
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;
        this._nameInputSelector = nameInputSelector;
        this._describeInputSelector = describeInputSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._describeElement = document.querySelector(this._describeSelector);
        this._nameInputElement = document.getElementById(nameInputSelector);
        this._describeInputElement = document.getElementById(describeInputSelector);
        this.setUserInfo(this.getUserInfo());
        
    }

    getUserInfo(){
        //console.log(this._describeElement.textContent);
        return {
            name: this._nameElement.textContent,
            about: this._describeElement.textContent,
        }
    }
    setUserInfo(data){
        this._nameElement.textContent = data.name;
        this._describeElement.textContent = data.about;
        this._nameInputElement.value = data.name;
        this._describeInputElement.value = data.about;
    }

    setInputInfo(){
        this.setUserInfo(this.getUserInfo());
    }
}