/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-investor-pledge',
    templateUrl: './investor-pledge.component.html',
    styleUrls: ['./investor-pledge.component.css'],
    providers: [HttpService, AuthService]
})
export class InvestorPledgeComponent implements OnInit {

    pledge: any = {};
    validation: any;
    pageTitle = 'Investor';
    initAmount: number;
    agreeTerms: boolean;
    is_tc_read: boolean;

    constructor(private httpService: HttpService, private router: Router,
        private localStorageService: LocalStorageService, private authservice: AuthService, private location: Location) {
        this.is_tc_read = false;
        if (this.authservice.isUserLoggedIn() == false) {
            this.location.replaceState('/');
            this.router.navigate(['/signin']);
        }
    }

    createNewPledge() {
        let userData = this.pledge;
        userData.loggedin_id = this.localStorageService.get('userId');
        userData.acct_id = this.localStorageService.get('acct_id');

        var url = '/investorsPledge/new';
        var datas = this.httpService.httpPost(url, userData).subscribe(
            data => {
                if (data['status'] == 'true') {

                    Swal('Successfully submitted pledge.');
                    this.router.navigate(['prior-contributions']);

                    // if (this.localStorageService.get('role_id') == 1) {
                    //     this.router.navigate(['blue-angels-contact']);
                    // } else {
                    //     this.router.navigate(['investor-contact']);
                    // }

                } else {
                    Swal('Unable to submitted pledge.');
                }
            }, error => console.log('Error: Unable to submitted pledge.')
        );
    }

    ngOnInit() {
        if (this.localStorageService.get('role_id') == 1) {
            this.pageTitle = 'Blue Angel';
        } else {
            this.pageTitle = 'Investor';
        }
    }
    calclulateAmount() {
        this.pledge.amount = this.initAmount * 2700;
    }
    agreeTermsAndConditions() {
        this.agreeTerms = !this.agreeTerms;
    }

    openTCPopup() {
        this.is_tc_read = true;
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
}
