/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpService} from '../http/http.service';
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import {SharedService} from '../services/shared.service';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [HttpService, AuthService]
})
export class SigninComponent implements OnInit {
    User: any = {};
    url: '';
    isOptional: boolean = false;
    forgotUser: any = {};
    formPage: number;
    otpMobileNumber: string;

    otpCode: number;
    userLoginData: any;



    constructor(private router: Router, private httpService: HttpService, private localStorageService: LocalStorageService,
                private authservice: AuthService, private cookieService: CookieService, private userData: SharedService) {
        this.formPage = 1;
    }

    loginStatus: boolean = false;
    loginResponse: any;
    resendOtpCount: number = 0;

    resendOTPToUser(user_id) {
        this.resendOtpCount++;
        this.authservice.sendOtp(user_id).subscribe((datum) => {
            Swal('OTP has been resent');
        });
    }

    Login() {

        let userData = {
            'username': this.User.username,
            'password': this.User.userpwd
        };
        var url = '/login';
        this.httpService.httpPost(url, userData).subscribe(
            data => {
                console.log(data);

                // this.authservice.updateLoginStatus(data['data']);
                // this.redirectUserBasedOnRole(data['data']['role_id']);
                if (data['status'] == 'true') {
                    this.userLoginData = data;
                    this.otpMobileNumber = this.userLoginData.data.user_phone;
                    // Check if user has verified OTP on this device
                   if(
                        (
                            this.cookieService.check('is_otp_verified_'+this.userLoginData['data']['id']) &&
                            this.cookieService.get('is_otp_verified_'+this.userLoginData['data']['id']) === 'true'
                        ) ||
                        Number(this.userLoginData.data.role_id) === 5  || Number(this.userLoginData.data.role_id) === 1 || Number(this.userLoginData.data.role_id) === 7 || Number(this.userLoginData.data.role_id) === 2 
                        || Number(this.userLoginData.data.role_id) === 3 || Number(this.userLoginData.data.role_id) === 4 || Number(this.userLoginData.data.role_id) === 6
                    ) {
                        this.setLoginSession(this.userLoginData);
                        this.userData.userroleid = Number(this.userLoginData.data.role_id);
                    } else {
                        this.authservice.sendOtp(this.userLoginData['data']['id'])
                            .subscribe((datum) => {
                                this.formPage = 3;
                            });
                    }
                } else {
                    this.User.userpwd ='';
                    // alert('Invalid Credentials!');
                    Swal('Invalid Credentials!');

                }
            }, error => {
                Swal('Invalid Credentials!');
                this.router.navigate(['/signin']);
                console.log('There was an error: ');
            });
    }


    VerifyOtp() {
        this.authservice.verifyOtp(this.userLoginData['data']['id'], this.otpCode)
        .subscribe((res) => {
            if(res['status']) {
                this.cookieService.set('is_otp_verified_'+this.userLoginData['data']['id'], 'true', 365)
                this.setLoginSession(this.userLoginData);
            } else {
                Swal('Invalid Otp!');
                this.router.navigate(['/signin']);
            }
        });
    }


    setLoginSession(data) {
        if (data['data']['id']) {
            this.cookieService.set('auth_token', data['data']['auth_token'], 365)
            this.authservice.updateLoginStatus(data['data']);
            if (data['data']['pledge_status'] == true || data['data']['has_completed'] == '1') {
                this.redirectUserBasedOnRole(data['data']['role_id']);
            } else {
                if (data['data']['sec_role_id'] == 7) {
                    if (data['data']['role_id'] == 1 || data['data']['role_id'] == 2) {
                        this.router.navigate(['/investor-signup/' + data['data']['id']]);
                    }else if (data['data']['role_id'] == 3) {
                        this.router.navigate(['/signup/' + data['data']['id']]);
                    }else if (data['data']['role_id'] == 4) {
                        this.router.navigate(['/state-signup/' + data['data']['id']]);
                    }else{
                        // Redirecting to windem home
                        this.redirectUserBasedOnRole(data['data']['role_id']);
                    }
                } else {
                    this.router.navigate(['/manager-staff-signup/' + data['data']['id']]);
                }

            }
            /* if (data['data']['pledge_status'] == true) {
                this.redirectUserBasedOnRole(data['data']['role_id']);
            } else {
                if (data['data']['role_id'] == 1 || data['data']['role_id'] == 2) {
                    this.router.navigate(['pledge']);
                } else {
                    this.redirectUserBasedOnRole(data['data']['role_id']);
                }

            } */

        } else {
            this.loginStatus = true;
            this.loginResponse = data['data'];


        }
    }


    secondLevelVerification() {
        let userData = {
            'user_email': this.User.username,
            'g2fa_code': this.User.g2fa_code
        };
        var url = '/users/validateG2faCode';
        this.httpService.httpPost(url, userData).subscribe(
            data => {
                console.log(data);
                if (data['status'] == true) {
                    this.authservice.updateLoginStatus(this.loginResponse);
                    this.redirectUserBasedOnRole(this.loginResponse['role_id']);
                } else {
                    // alert('TOTP is not valid!');
                    Swal('TOTP is not valid!');
                    this.router.navigate(['/signin']);
                }
            }, error => {
                // alert('Error: while validating Google2FA!');
                Swal('while validating Google2FA!');
            });
    }

    showForgotPwdForm(){
        this.formPage = 2;
    }

    showOtpForm(){
        this.formPage = 3;
    }

    verifyOtp() {

    }


    resetUserPassword() {
        var forgotUserData = this.forgotUser;

        var url = '/users/verifyRegisteredEmail';

        this.httpService.httpPost(url, forgotUserData).subscribe(data => {
            if (data['status'] == 'true') {
                var url = '/users/sendResetPwdMail';
                var mailData = data;
                mailData['website_url'] = environment.resourceUrl;
                this.httpService.httpPost(url, mailData).subscribe(data => {});
                Swal("Password reset link has been sent to your email. Please check your inbox.");
                this.loginStatus = false;
                this.forgotUser = {};
                this.forgotUser = '';
                this.router.navigate(['/signin']);
            }else {
                Swal('The email is not registered in our system. Please verify your email.');
            }
        });
    }

    // Called after login success
    redirectUserBasedOnRole(role_id: number) {
        if (role_id == 1)
            this.router.navigate(['/blue-angels-contact']);
        else if (role_id == 2)
            this.router.navigate(['/investor-contact']);
        else if (role_id == 3)
            this.router.navigate(['/federal-candidate-home']);
        else if (role_id == 4)
            this.router.navigate(['/state-candidate-home']);
        else if (role_id == 5)
            this.router.navigate(['/manage-invitations/5']);
        else if (role_id == 7)
            this.router.navigate(['/volunteer-home']);
    }

    cancelLogin() {
        this.formPage = 1
        this.loginStatus = false;
        this.User = {};
        this.forgotUser.registered_email = '';
    }

    ngOnInit() {
        if (this.localStorageService.get('userId')) {
            this.redirectUserBasedOnRole(this.localStorageService.get('role_id'));
        } else {
            this.router.navigate(['/signin']);
        }

    }

    ngOnDestroy() {
    }
}

