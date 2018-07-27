/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit, Attribute} from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../http/http.service';
import {AuthService} from '../services/auth.service';
import {LocalStorageService} from 'angular-2-local-storage';
import Swal from 'sweetalert2';
import {environment} from '../../environments/environment';
import {SharedService} from '../services/shared.service';
@Component({
    selector: 'app-investor-contact',
    templateUrl: './windem-invitations.component.html',
    styleUrls: ['./windem-invitations.component.css'],
    providers: [HttpService, DatePipe, AuthService]
})
export class WindemInvitationsComponent implements OnInit {
    windemInvitations: any = [];
    recordCount: number = 0;
    private date;
    currentDate;
    status = '';
    expiresStatus: string = '';
    type = '';
    invitationUrl = '';
    pageTitle: string = '';
    order: string = 'user_id';
    userRole:any;
    p:any;

    constructor(private httpService: HttpService, private datePipe: DatePipe,
                private route: ActivatedRoute, private router: Router, private authservice: AuthService,
                private localStorageService: LocalStorageService, private location: Location, private userData: SharedService) {
        if(this.authservice.isUserLoggedIn() == false){
            this.location.replaceState('/');
            this.router.navigate(['/signin']);
        }
        var attemptedUrl = window.location.href;
        var attemptedRoleId = attemptedUrl[attemptedUrl.length -1];
        console.log(attemptedRoleId);
        console.log(this.userData.userroleid);
        
        if(this.userData.userroleid !== parseInt(attemptedRoleId) || this.userData.userroleid === 6 || this.userData.userroleid===7) {

            window.history.back();
            // window.location.reload();
            alert("Access Dennied!");
          }

    }

    getContactInvitations(loggedInId) {
        var url = '/users/getContactInvitations/' + loggedInId;
        this.httpService.httpGet(url)
            .subscribe((data) => {
                console.log(data);
                this.windemInvitations = data['data'];
                this.recordCount = data['data'].length;
            });
    }

    expiresInvitation(expires) {
        this.expiresStatus = '';
        if (this.currentDate >= expires) {
            this.expiresStatus = 'expired';
        }
        else {
            this.expiresStatus = 'invited';
        }
        return this.expiresStatus;
    }

    needToShowReactivation(expireTime, status) {
        if (this.currentDate >= expireTime && status != 'Active')
            return true;
        else
            return false;
    }

    logoutUser() {
        this.authservice.logoutUser();
        this.router.navigate(['/signin']);
    }
    reSendInvitation(user_id,email,name,role_name){
        var userData:any = {};
        userData.url = environment.resourceUrl;
        userData.user_id = user_id;
        userData.email = email;
        userData.name = name;
        userData.role_name = role_name;
        userData.invitor_role_id = this.localStorageService.get('role_id')

        var url = '/users/resendInvitation';
        this.httpService.httpPost(url, userData).subscribe(data => {
            if (data['status'] == 'true') {
                var url = '/users/sendMail';
                var mailData = data;
                mailData['website_url'] = environment.resourceUrl;
                this.httpService.httpPost(url, mailData).subscribe(data => {});
                Swal("Invitation as been sent successfully.");
                this.getContactInvitations(this.localStorageService.get('userId'));
            }else {
                Swal('unable to send invitations.');
            }
        });
    }
    ngOnInit() {
        var date = new Date();
        this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
        this.route.params.subscribe(data => {
            this.invitationUrl = '/invite-users/' + data.role;
            this.userRole =data.role;
        });
        this.pageTitle = this.localStorageService.get('role_name');
        this.getContactInvitations(this.localStorageService.get('userId'));
    }
}
