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
import { LocalStorageService } from 'angular-2-local-storage';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-investor-signup',
    templateUrl: './investor-signup.component.html',
    styleUrls: ['./investor-signup.component.css'],
    providers: [HttpService, AuthService]


})
export class InvestorSignupComponent implements OnInit {
    Investor: any = {};
    pageTitle: string = '';
    inputType:any = 'password';
    changeInputType:any;
    mismacth:boolean;
    phone_error:boolean;
    is_statuary: boolean;

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private route: ActivatedRoute, private httpService: HttpService,
                private router: Router, private authservice: AuthService,
                private localStorageService: LocalStorageService,) {
    }
    phoneValidation(){
        this.phone_error = false;
        if( this.Investor.phone.replace(/[^0-9]/g,'').length < 10) {
            this.phone_error=true;
        }
    }
    signupUser() {
        let userData = this.Investor;
        var url = '/investor/new';
        var datas = this.httpService.httpPost(url, userData).subscribe(
            data => {
                if (data['status'] == 'true') {
                    // Swal('Successfully registered. Use your email and password to login.');
                    // this.logoutUser();
                    Swal('The information has been updated successfully');
                    if (this.localStorageService.get('pledge_status') == true) {
                        this.redirectUserBasedOnRole(this.localStorageService.get('role_id'));
                    } else {
                        if (this.localStorageService.get('role_id') == 1 || this.localStorageService.get('role_id') == 2) {
                            this.router.navigate(['pledge']);
                        } else {
                            this.redirectUserBasedOnRole(this.localStorageService.get('role_id'));
                        }

                    }
                } else {
                    Swal('Unable to register user.');
                }
            }, error => console.log('There was an error: ')
        );
    }
    redirectUserBasedOnRole(role_id: number) {
        if (role_id == 1)
            this.router.navigate(['/blue-angels-contact']);
        else if (role_id == 2)
            this.router.navigate(['/investor-contact']);
        else if (role_id == 7)
            this.router.navigate(['/volunteer-home']);
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
                
                console.log(data, 'role');
                this.Investor = data['data']['0'];
                if (this.Investor.role_id == 1) {
                    this.pageTitle = 'Blue Angel';
                } else if (this.Investor.role_id == 2) {
                    this.pageTitle = 'Investor';
                } else if (this.Investor.role_id == 7) {
                    this.pageTitle = 'Volunteer';
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
