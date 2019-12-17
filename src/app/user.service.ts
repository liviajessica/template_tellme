export class UserService {
    private email: string;
    private uid: string;

    constructor(){}

    setUser(email: string, uid: string){
        this.email = email;
        this.uid = uid;
    }

    getUID(){
        return this.uid;
    }
}