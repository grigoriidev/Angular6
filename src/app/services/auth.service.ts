/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {SharedService} from './shared.service';

@Injectable()
export class AuthService {
    constructor(private localStorageService: LocalStorageService, private http: HttpClient, private cookieService: CookieService,
                private sharedService: SharedService) {
    }

    isUserLoggedIn() {
        // console.log(this.localStorageService.get('isUserLoggedIn'));
        if (this.localStorageService.get('isUserLoggedIn') == true) {
            return true;
        }
        else {
            return false;
        }
    }

    getPermissionStatus(key_alias) {
        if (this.localStorageService.get(key_alias) == 1) {
            return true;
        } else {
            return false;
        }
    }

    getPermissionsAllotments(role_id, sec_role_id) {
        var mythis = this;
        this.http.get(environment.hostname + '/permissionAllotments/getKeyAlias/' + role_id + '/' + sec_role_id)
            .subscribe((data) => {
                var permissions = data['data'];
                permissions.forEach(function (row) {
                    console.log(row.key_alias);
                    mythis.localStorageService.set(row.key_alias, row.status);
                });
            });
    }

    updateLoginStatus(user: any) {
        this.localStorageService.set('isUserLoggedIn', true);
        this.localStorageService.set('userName', user.username);
        this.localStorageService.set('name', user.name);
        this.localStorageService.set('userId', user.id);
        this.localStorageService.set('role_name', user.role_name);
        this.localStorageService.set('role_id', user.role_id);
        this.localStorageService.set('sec_role_id', user.sec_role_id);
        this.localStorageService.set('acct_id', user.acct_id);
        this.localStorageService.set('camp_id', user.camp_id);
        this.localStorageService.set('pledge_status', user.pledge_status);
        this.sharedService.change();

        this.getPermissionsAllotments(user.role_id, user.sec_role_id);
    }

    logoutUser() {
        // clear all user data from browser
        this.cookieService.delete('auth_token');
        this.localStorageService.clearAll();
        this.sharedService.change();
    }

    updateProfilePicture(profile_picture: string) {
        console.log('updating from service');
        this.localStorageService.set('profile_picture', profile_picture);
    }

    getProfilePicture() {
        return this.localStorageService.get('profile_picture');
    }

    getLoggedInUserId() {
        return this.localStorageService.get('userId');
    }

    getLoggedInUserName() {
        if (this.localStorageService.get('isUserLoggedIn') == true) {
            let userName = this.localStorageService.get('userName');
            return userName;
        } else {
            return 'Anonymous';
        }
    }

    getLoggedInUserRole() {
        return this.localStorageService.get('role_name');
    }

    getLoggedInUserRoleId() {
        return this.localStorageService.get('role_id');
    }

// Send OTP to user
    sendOtp(user_id) {
        return this.http.get(environment.hostname + '/sendOtp/' + user_id);
    }
// Verify OTP for user
    verifyOtp(user_id, otp) {
        return this.http.get(environment.hostname + '/verifyOtp/' + user_id + '/'  + otp);
    }
}
