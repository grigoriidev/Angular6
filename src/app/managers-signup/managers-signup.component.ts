/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../http/http.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-managers-signup',
    templateUrl: './managers-signup.component.html',
    styleUrls: ['./managers-signup.component.css'],
    providers: [HttpService, AuthService]
})
export class ManagersSignupComponent implements OnInit {
    Investor: any = {};
    pageTitle: string = '';
    inputType:any = 'password';
    changeInputType:any;
    mismacth:boolean;
    phone_error:boolean;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private route: ActivatedRoute, private httpService: HttpService,
                private router: Router, private authservice: AuthService,) {
    }

    signupUser() {
        let userData = this.Investor;
        var url = '/manager/new';
        var datas = this.httpService.httpPost(url, userData).subscribe(
            data => {
                console.log(data);
                if (data['status'] == 'true') {
                    Swal('Successfully registered. use your email and password to login.');
                    this.logoutUser();
                } else {
                    Swal('Unable to register user.');
                }
            }, error => console.log('There was an error: '));
    }

    logoutUser() {
        this.authservice.logoutUser();
        this.router.navigate(['/signin']);
    }
    changeType(){
        this.changeInputType = !this.changeInputType;
        if( this.changeInputType){
            this.inputType = 'text';
        }else{
            this.inputType = 'password';
        }
        
    }
    pwdMatchValidator() {
        if(this.Investor.password != this.Investor.password1){
           this.mismacth = true;
        }else{
            this.mismacth = false;
        }
     }
    ngOnInit() {
        this.route.params.subscribe(data => {
            console.log(data);
            this.httpService.httpGet('/users/getUserSignupInfo/' + data.token).subscribe(data => {
                console.log(data);
                this.Investor = data['data']['0'];
                if (this.Investor.sec_role_id == 2) {
                    this.pageTitle = 'Manager';
                } else if (this.Investor.sec_role_id == 3) {
                    this.pageTitle = 'Staff';
                }
            });
        });
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;

        }

        return true;

    }
}
