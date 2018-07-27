/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../http/http.service';
import {environment} from '../../environments/environment';
import {DropDownValueClass} from '../services/dropdown-value.class';
import {DropdownValuesService} from '../services/dropdown-values.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-investor-contact',
    templateUrl: './windem-home.component.html',
    styleUrls: ['./windem-home.component.css'],
    providers: [HttpService, DropdownValuesService]
})
export class WindemHomeComponent implements OnInit {
    windem: any = {};
    pageTitle: string = '';
    Roles: DropDownValueClass[];
    invitor_role_id: number = 0;
    phone_error:boolean;
    locationSer: any;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private router: Router, private dpservice: DropdownValuesService,
                private httpService: HttpService, private route: ActivatedRoute,
                private localStorageService: LocalStorageService, private location: Location) {

        this.locationSer = location;
    }

    sendInvitation() {
        var invitationData = {
            role: this.windem.role, // role or sec_role_id
            name: this.windem.name,
            email: this.windem.email,
            phone: this.windem.phone,
            url: environment.resourceUrl,
            invitor_role_id: this.invitor_role_id,
            from_email: this.localStorageService.get('userName')
        };
        console.log(invitationData);
        var url = '/users/sendInvitationMail';
        this.httpService.httpPost(url, invitationData).subscribe(data => {
            console.log(data['status']);
            if (data['status'] == 'true') {
                // alert("Email verification has been sent! please check your mail and click on confirmation link");
                // this.router.navigate(['/manage-invitations/'+this.invitor_role_id]);
            } else {
                console.log('Error: unable to send invitations!');
            }
        });
        Swal('Email verification has been sent! please check your mail and click on confirmation link');
        this.router.navigate(['/manage-invitations/' + this.invitor_role_id]);
    }

    // getContactInvitations(type){
    //   var url='/users/getContactInvitations/'+type
    //   this.httpService.httpGet(url)
    //   .subscribe((data) => {
    //       console.log(data);
    //   });
    // }

    getRoles(invitor_role_id: number) {
        this.dpservice.getRoles(invitor_role_id).subscribe(
            data => {
                this.Roles = data['data'];
            }, error => {
                console.log('error: unable to get roles dropdown values');
            }
        );
    }

    ngOnInit() {
        this.route.params.subscribe(data => {
            this.windem.invitor_role_id = data.role;
            this.getRoles(data.role);
        });

        this.invitor_role_id = this.localStorageService.get('role_id');
    }

}
