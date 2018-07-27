import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import Swal from 'sweetalert2';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Add Bearer token to header for all requests
        if (this.cookieService.check('auth_token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.cookieService.get('auth_token')}`
                }
            });
        }

        return next.handle(request).do((event: HttpEvent<any>) => {

        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if(err['status'] === 403) {
                    this.authService.logoutUser();
                    Swal('Oops...', 'You have been logged out because of inactivity. Please login again', 'error');
                    this.router.navigate(['/signin']);
                } else if(err['status'] === 401) {
                    this.authService.logoutUser();
                    Swal('Oops...', 'Invalid Token. You have been logged out. Please login again', 'error');
                    this.router.navigate(['/signin']);
                } else if (err['status'] === 500) {
                    console.log(err['status'])
                    Swal('Oops...', 'Something went wrong! Please contact techsupport@windem.org', 'error');
                }
            }
        });
    }
};