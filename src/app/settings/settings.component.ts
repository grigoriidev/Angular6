/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {AuthService} from '../services/auth.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [HttpService, AuthService]
})
export class SettingsComponent implements OnInit {

  model: any = {g2fa_status:false, g2fa_url: ''};

  constructor(private httpService: HttpService, 
    private localStorageService: LocalStorageService, private http: HttpClient,
    private authservice: AuthService, private router: Router, private location: Location) { 
      if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
      }
    }

    getUserInfo() {
        var url = '/users/getById/' + this.localStorageService.get('userId');
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                console.log(data);
                this.model = data['data'];
                this.model.g2fa_status = (data['data']['g2fa_status'] == '0') ? false : true;
                //this.google2faUrl = data['qrcode_url'];
            });
    }

    activateGoogle2fa() {
        let userData = {
            'user_email': this.localStorageService.get('userName'),
            'user_id': this.localStorageService.get('userId'),
            'g2fa_status': this.model.g2fa_status
        };
        var url = '/users/activateG2fa';
        if (this.model.g2fa_status === false) {
            url = '/users/deactivateG2fa';
            this.httpService.httpPost(url, userData).subscribe(
                data => {
                    console.log(data);
                    this.model.g2fa_url = data['g2fa_url'];
                    Swal('Successfully deactivated the 2FA');
                }, error => {
                    Swal('whie deactivating Google2FA!');
                });
        } else {
            this.httpService.httpPost(url, userData).subscribe(
                data => {
                    console.log(data);
                    this.model.g2fa_url = data['g2fa_url'];
                }, error => {
                    Swal('whie updating Google2FA!');
                });
        }

    }

    logoutUser() {
        this.authservice.logoutUser();
        this.router.navigate(['/signin']);
    }

    ngOnInit() {
        this.getUserInfo();
    }

}
