/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpService} from '../http/http.service';
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import {Location} from '@angular/common';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-signin',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [HttpService, AuthService]
})
export class ResetPasswordComponent implements OnInit {

    tokenId: string;
    params: any;
    model1: any;
    inputType: string;
    mismacth: boolean;
    changeInputType: boolean;

    constructor(private router: Router, private location: Location, private httpService: HttpService, private route: ActivatedRoute) {
        this.model1 = {};
        this.inputType = 'password';
    }


    changeType(){
        this.changeInputType = !this.changeInputType;
        if( this.changeInputType){
            this.inputType = 'text';
        }else{
            this.inputType = 'password';
        }

    }


    ngOnInit() {
        this.route.params.subscribe(data => {
            this.params = data;
            this.httpService.httpPost('/users/verifyToken', {'token' : this.params.tokenId}).subscribe(
                datum => {
                    console.log(datum);
                    if (datum['status'] === 'true') {
                        this.tokenId = this.params.tokenId;

                    } else {
                        // alert('Invalid Credentials!');
                        Swal(datum['message']);
                        this.router.navigate(['/signin']);
                    }
                }, error => {
                    Swal('Invalid Token!');
                    this.router.navigate(['/signin']);
                    console.log('There was an error: ');
                });
        });
    }

    pwdMatchValidator() {
        if(this.model1.password !== this.model1.confirm){
            this.mismacth = true;
        }else{
            this.mismacth = false;
        }
    }

    goBack() {
        this.location.back();
        console.log( 'goBack()...' );
    }

    changePassword(){
        if(this.model1.password && this.tokenId){
            this.model1.token = this.tokenId;
            this.httpService.httpPost('/users/change-password', this.model1).subscribe(
                data => {
                    console.log(data);
                    if (data['status'] === 'true') {
                        Swal('The password has been changed successfully.');
                        this.router.navigate(['/signin']);
                    } else {
                        Swal('Unable to change password.');
                    }
                }, error => console.log('There was an error: ')
            );
        }
        else{
            Swal('Enter the password');
        }

    }


    cancelLogin() {

    }
}

