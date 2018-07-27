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
    templateUrl: './enter-contributions.component.html',
    styleUrls: ['./enter-contributions.component.css'],
    providers: [HttpService, AuthService]


})
export class EnterContributionComponent implements OnInit {
    tranches: any = [];
    pledges: any = '';
    selectedTranch: any;

    constructor(private route: ActivatedRoute, private httpService: HttpService,
                private router: Router, private authservice: AuthService) {
    }

    ngOnInit() {
        this.getTrancheList();
    }


    getUnAllocatedPayment(pledge) {
        if(this.checkIsPaid(pledge)) {
            return pledge.refund_amt;
        }

        if (parseInt(pledge.actual_amt, 10) === 0) {
            pledge.refund_amt = 0;
            return pledge.refund_amt;
        }
        pledge.refund_amt = pledge.actual_amt % 2700;
        return pledge.refund_amt;
    }




    checkIsPaid(pledge) {
        return (parseInt(pledge['is_paid'], 10) === 1) ? 1 : 0;
    }

    getTrancheList() {

        const url = '/investorsPledge/listTranche';
        this.httpService.httpGet(url)
            .subscribe((data) => {
                this.getCurrentUnApprovedPledges();
                this.tranches = data['data'];
                if(this.tranches.length > 0)
                    this.selectedTranch = this.tranches[0]['period'];
            });
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;

        }

        return true;

    }


    enterContributions() {
        const url = '/investorsPledge/update';
        this.httpService.httpPost(url, this.pledges)
            .subscribe((data) => {
                Swal('Successfully saved the data');
                this.getCurrentUnApprovedPledges();
            });
    }


    getCurrentUnApprovedPledges(tranch_id = null) {
        let url = '/investorsPledge/list/pending';
        if (tranch_id) {
            url = url + '/' + tranch_id;
        }
        this.httpService.httpGet(url)
            .subscribe((data) => {
                this.pledges = data['data'];
            });
    }
}
