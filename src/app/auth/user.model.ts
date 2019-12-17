export class User{
    constructor(
        public id: string,
        public email: string,
        public _token: string,
        public tokenExpirationDate: Date
    ){}

    getToken(){
        if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()){
            return null;
        }
        return this._token;
    }

    getId(){
        return this.id;
    }
}