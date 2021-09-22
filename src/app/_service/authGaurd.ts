import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './authService.service';

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private router: Router
        , private authService: AuthService) {}

    canActivate() {
        // Check to see if a user has a valid token
        if (this.authService.isAuthenticated()) {
            return true;
        }
        // If not, they redirect them to the login page
        this.router.navigate(['/login']);
        return false;
    }


}