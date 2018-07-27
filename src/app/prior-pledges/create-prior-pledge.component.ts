/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http/http.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {LocalStorageService} from 'angular-2-local-storage';
import {AuthService} from '../services/auth.service';
import {IMyDpOptions} from 'mydatepicker';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-create-prior-pledge',
    templateUrl: './create-prior-pledge.component.html',
    styleUrls:['./prior-pledges.component.css'],
    providers: [HttpService, AuthService]
})
export class CreatePriorPledgeComponent implements OnInit {

    campaigns: any = [];
    pledge: any = {};
    validation: any;
    roleName: any;
    disableAmount: boolean;
    isvalidAmount = false;
    pageTitle = 'Create New';
    locationSer: any;
    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
      };
      
    constructor(private route: ActivatedRoute,private httpService: HttpService, private http: HttpClient,
                private router: Router, private localStorageService: LocalStorageService,
                private location: Location, private authservice: AuthService) {
        this.locationSer = location;

    }

    getPermissionStatus(key_alias) {
        return this.authservice.getPermissionStatus(key_alias);
    }

    getCampaigns() {
        var url = '/candidate/getCandidatesForDropdown';
        var mythis = this;
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                console.log(data);
                this.campaigns = data['data'];
            });
    }

    createNewPledge() {
        let userData = this.pledge;
        userData.loggedin_id = this.localStorageService.get('userId');
        userData.acct_id = this.localStorageService.get('acct_id');
        if(this.pageTitle == 'Edit'){
            var url = '/investorsPledge/prior/update';
            var datas = this.httpService.httpPost(url, userData).subscribe(
                data => {
                    if (data['status'] == 'true') {
                        Swal('Successfully updated contribution.');
                        this.router.navigate(['prior-contributions']);
                    } else {
                        Swal('Unable to update contribution.');
                    }
                }, error => console.log('Error: Unable to update contribution.')
            );
        }else{
            var url = '/investorsPledge/prior/new';
            var datas = this.httpService.httpPost(url, userData).subscribe(
                data => {
                    if (data['status'] == 'true') {
                        Swal('Successfully created new contribution.');
                        this.router.navigate(['prior-contributions']);
                    } else {
                        Swal('Unable to create new contribution.');
                    }
                }, error => console.log('Error: Unable to create new contribution.')
            );
        }
    }

    getPriorPledgeById(id) {
        var url = '/investorsPledge/prior/getById/'+id;
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                console.log(data);
                this.pledge = data['data'][0];
            });
    }

    ngOnInit() {
        this.getCampaigns();
        this.roleName = this.localStorageService.get('role_name');
        const id = +this.route.snapshot.paramMap.get('id');
        if(id > 0){
            this.getPriorPledgeById(id);
            this.pageTitle = 'Edit';
        }
    }
    refresh(){
        this.pledge.amount = '';
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            this.validation = 'Please enter a valid number';
            this.isvalidAmount = false;
            return false;
        }else if(event.target.value > 2700){
            this.validation = 'The amount should not exceed $2700';
            this.isvalidAmount = false;
            return false;
        }else{
            this.isvalidAmount = true;
            this.validation = ' ';
            return true;
        }

    }
}
