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
    selector: 'app-investor-contact',
    templateUrl: './pledge-biweekly-contributions.component.html',
    styleUrls: ['./pledge-biweekly-contributions.component.css'],
    providers: [HttpService, AuthService]


})
export class PledgeBiWeeklyContributionComponent implements OnInit {
    is_saved: boolean;
    pledgeData: any = {
        acct_id	: '',
        tranche : '',
        pledged_amt : 0,
        actual_amt : 0,
        refund_amt : 0,
        payment_type: '1',
        total_pledged: 0,
        remaining_pledged: 0,
        no_of_pledge: 1
    };

    trancheData: any;
    biWeeklyPledgeResponse: any;

    constructor(private route: ActivatedRoute, private httpService: HttpService,
                private authservice: AuthService) {
        this.is_saved = false;
        this.changeNoOfPledge();
        this.biWeeklyPledgeResponse = false;
    }

    ngOnInit() {
        this.getCurrentTrancheUserInfo();
    }


    changeNoOfPledge() {

        this.pledgeData.pledged_amt = this.pledgeData.no_of_pledge * 2700;
    }

    getCurrentTrancheUserInfo() {

        const url = '/investorsPledge/current';
        this.httpService.httpGet(url)
            .subscribe((data: any) => {

                this.trancheData = data.data.tranche;
                this.pledgeData.tranche  = this.trancheData.period;

                this.pledgeData.total_pledged  = data.data.biWeeklyPledge.total_pledged;
                this.pledgeData.remaining_pledged  = data.data.biWeeklyPledge.remaining_pledged;

                if (data.data.biWeeklyPledge.pledged_amt) {
                    this.is_saved = true;
                    this.pledgeData.pledged_amt = data.data.biWeeklyPledge.pledged_amt;
                    this.pledgeData.no_of_pledge = this.pledgeData.pledged_amt / 2700;
                    this.pledgeData.payment_type = data.data.biWeeklyPledge.payment_type;
                }
            });
    }


    pledgeBiweeklyContribution() {
        const url = '/investorsPledge/create';
        this.httpService.httpPost(url, this.pledgeData)
            .subscribe((data) => {
                this.is_saved = true;
                Swal('Successfully pledged for this Tranche.');
            });
    }
}
