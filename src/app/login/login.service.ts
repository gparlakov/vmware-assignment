import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    constructor() {}

    getLoggedUser() {
        const user = localStorage.getItem('user');
        return user ? user : "";
    }

    getUserToken() {
        const token = localStorage.getItem('token');
        return token ? token : "";
    }
}