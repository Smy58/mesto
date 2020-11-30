export default class UserInfo{
    constructor(nameSelector, describeSelector){
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._describeElement = document.querySelector(this._describeSelector);
        this.setUserInfo(this.getUserInfo());
        
    }

    getUserInfo(){
        //console.log(this._describeElement.textContent);
        return {
            name: this._nameElement.textContent,
            describe: this._describeElement.textContent
        }
    }
    setUserInfo(data){
        this._nameElement.textContent = data.name;
        this._describeElement.textContent = data.describe;
    }
}