/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');


@Component({
  selector: 'app-create-invitation',
  templateUrl: './create-invitation.component.html',
  styleUrls: ['./create-invitation.component.css'],  
  providers: [HttpService, AuthService]
})
export class CreateInvitationComponent implements OnInit {
  constructor(private httpService: HttpService,private route: ActivatedRoute,private router: Router,
    private authservice: AuthService, private location: Location) { 
    // if(this.authservice.isUserLoggedIn() == false){
    //   this.location.replaceState('/');
    //   this.router.navigate(['/signin']);
    // }
  }

    ngOnInit() {
        this.route.params.subscribe(data => {
            var token = data.token;
            var invitor_role_id = data.invitor_role_id;
            this.httpService.httpGet('/getContactInviteInfo/' + data.token + '/' + data.invitor_role_id).subscribe(data => {
                if (data['data']['user_id']) {
                    this.router.navigate(['/user-signup/' + token + '/' + invitor_role_id]);
                    /* if (invitor_role_id == 5) {
                        if (data['data']['acct_class_id'] == 1 || data['data']['acct_class_id'] == 2 || data['data']['acct_class_id'] == 7) {
                            this.router.navigate(['/investor-signup/' + token + '/' + invitor_role_id]);
                        } else if (data['data']['acct_class_id'] == 3 || data['data']['acct_class_id'] == 4) {
                            this.router.navigate(['/signup/' + token + '/' + invitor_role_id]);
                        }
                    } else {
                        this.router.navigate(['/manager-staff-signup/' + token + '/' + invitor_role_id]);
                    } */
                } else {
                    Swal('Invalid Token Access token has been used');
                    this.router.navigate(['/signin']);
                }
            }, error => {
                console.log('Error: while validating invitation.');
            });
        });
    }
}