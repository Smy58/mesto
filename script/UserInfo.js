export default class UserInfo{
    constructor(nameSelector, describeSelector){
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;

        this.setUserInfo(this.getUserInfo());
    }

    getUserInfo(){
        return {
            name: document.querySelector(this._nameSelector).textContent,
            describe: document.querySelector(this._describeSelector).textContent
        }
    }
    setUserInfo(data){
        document.querySelector(this._nameSelector).textContent = data.name;
        document.querySelector(this._describeSelector).textContent = data.describe;
    }
}