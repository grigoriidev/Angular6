/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import {LocalStorageService} from 'angular-2-local-storage';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [HttpService, AuthService]
})
export class HeaderComponent implements OnInit {
    role: any;
    userName: any;

    constructor(private authservice: AuthService, private router: Router, 
        private localStorageService: LocalStorageService, private location: Location) {
    }

    ngOnInit() {
        this.role = this.localStorageService.get('role_name');
        this.userName = this.localStorageService.get('name');
    }

    logoutUser() {
        this.authservice.logoutUser();
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
    }

}
