import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {

    }
    isAuthenticated() {
        let token = localStorage.getItem('access-token');
        console.log('token service', token)
        if (token) {
            return true;
        }
        return false;
    }
}