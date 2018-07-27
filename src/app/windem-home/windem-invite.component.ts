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
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-windem-invite',
    templateUrl: './windem-invite.component.html',
    providers: [HttpService, DropdownValuesService, AuthService]
})
export class WindemInviteComponent implements OnInit {
    windem: any = {};
    invitation: any = {incumbent: false, role: 1, office_state: '', office_state1: '', office_sought: ''};
    pageTitle: string = '';
    Roles: DropDownValueClass[];
    invitor_role_id: any = 0;
    roleId: any = 1;
    validation: any;
    invitorRoleId: any;
    placeHolder: any;

    showInviteForm1 = true;
    showInviteForm2 = false;
    showOccupation = true;
    campaign_manager_cell_phone_error:boolean;
    office_phone_error:boolean;
    locationSer: any;

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private router: Router, private dpservice: DropdownValuesService,
                private httpService: HttpService, private route: ActivatedRoute,
                private localStorageService: LocalStorageService, private location: Location,
                private authservice: AuthService) {
        this.locationSer = location;
        if (this.authservice.isUserLoggedIn() == false) {
            this.location.replaceState('/');
            this.router.navigate(['/signin']);
        }
    }

    onTypeSelection(event, i) {
        this.placeHolder = event;
        this.invitation.role = i;
        if (this.invitor_role_id == 5) {
            if (this.placeHolder == 'State Level Campaign/Candidate' || this.placeHolder == 'Federal Level Campaign/Candidate') {
                this.showInviteForm1 = false;
                this.showInviteForm2 = true;
            } else {
                this.showInviteForm1 = true;
                this.showInviteForm2 = false;
            }
            if(this.placeHolder == 'Volunteers'){
                this.showOccupation = false;
            }else{
                this.showOccupation = true;
            }
        }
        // Only for windem users
        // if (this.invitor_role_id == 5) {
        //     if (this.invitation.role == 3 || this.invitation.role == 4) {
        //         this.showInviteForm1 = false;
        //         this.showInviteForm2 = true;
        //     } else {
        //         this.showInviteForm1 = true;
        //         this.showInviteForm2 = false;
        //     }
        // }
    }

    passwordValidation(){
        this.campaign_manager_cell_phone_error=false;
        this.office_phone_error=false;
        if( this.invitation.office_phone.replace(/[^0-9]/g,'').length < 10) {
            this.office_phone_error=true;

        }else if ( this.invitation.campaign_manager_cell_phone.replace(/[^0-9]/g,'').length < 10) {
            this.campaign_manager_cell_phone_error=true;
        }
    }
    sendInvitation() {
       /*this.campaign_manager_cell_phone_error=false;
       this.office_phone_error=false;
       if( this.invitation.office_phone.replace(/[^0-9]/g,'').length < 10) {
           this.office_phone_error=true;

       } else if ( this.invitation.campaign_manager_cell_phone.replace(/[^0-9]/g,'').length < 10) {
           this.campaign_manager_cell_phone_error=true;
        } else {


       }
*/

        Swal({
            title: 'Are you sure?',
            text: 'You want to send invitation for the role of ' + this.placeHolder + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Proceed!',
            cancelButtonText: 'No, Go Back'
        }).then((result) => {
            if (result.value) {
                var invitationData = this.invitation;
                invitationData.url = environment.resourceUrl;
                invitationData.invitor_role_id = this.invitor_role_id;
                invitationData.invitor_id = this.localStorageService.get('userId');
                invitationData.from_email = this.localStorageService.get('userName');
                invitationData.sec_role_id = this.localStorageService.get('sec_role_id');

                console.log(invitationData);
                var url = '/users/sendInvitation';
                this.httpService.httpPost(url, invitationData).subscribe(data => {
                    if (data['status'] == 'true') {
                        var url = '/users/sendMail';
                        var mailData = data;
                        mailData['website_url'] = environment.resourceUrl;
                        mailData['is_cm_email'] = false;
                        this.httpService.httpPost(url, mailData).subscribe(data => {});
                        
                        if(data['cm_status'] == 'true') {
                            var cmmailData=mailData;
                            cmmailData['manager_for'] = data['name'];
                            cmmailData['name'] = data['cm_name'];
                            cmmailData['to_email'] = data['cm_to_email'];
                            mailData['is_cm_email'] = true;
                            this.httpService.httpPost(url, cmmailData).subscribe(data => {});
                        }

                        Swal('Invitation email has been sent successfully!');
                        this.router.navigate(['/manage-invitations/' + this.invitor_role_id]);
                    } else if (data['status'] == 'duplicate') {
                        Swal('Email already exists in our system.');
                    } else {
                        Swal('unable to send invitations!');
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log('Cancelled');
            }
        });


    }

    getRoles(invitor_role_id: number) {
        this.dpservice.getRoles(invitor_role_id).subscribe(
            data => {
                this.Roles = data['data'];
                // this.invitation.role = 1;
                console.log(this.Roles);
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
        if (this.invitor_role_id == '5') {
            this.placeHolder = 'Blue Angel';
        } else {
            this.placeHolder = 'Manager';
        }

    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            this.validation = 'Please enter valid number';
            return false;

        }
        this.validation = ' ';

        return true;

    }

    stringsOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) ||
          charCode == 8 || charCode == 9 || charCode == 16) {
            this.validation = 'Please enter valid number';
            return true;
        }

        return false;

    }


}
