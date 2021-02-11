export default class Api{
    constructor(options ){
        this._options = options;
        this._baseUrl = options.baseUrl;
        this._headers = {headers: options.headers};
        this._headersGet ={
            method: 'GET',
            headers: options.headers
        };
        this._headersPatch ={
            method: 'PATCH',
            headers: options.headers
        };
        this._headersPost ={
            method: 'POST',
            headers: options.headers
        };
    }

    getFetch(){
        return fetch(this._baseUrl + "/users/me", this._headersGet)
            .then(res => res.json());
    }

    getInitialCards(){
        return fetch(this._baseUrl + "/cards", this._headersGet)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
        
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getFetchPatch(st, body){
        this._headersPatch.body = body;
        return fetch(this._baseUrl + st, this._headersPatch)
            .then(res => res.json());
    }

    getFetchPost(st, body){
        this._headersPost.body = body;
        return fetch(this._baseUrl + st, this._headersPost)
            .then(res => res.json());
    }
}