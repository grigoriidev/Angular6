/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpService} from '../http/http.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

// const Swal = require('sweetalert2');

@Component({
    selector: 'app-state-signup',
    templateUrl: './state-signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [HttpService]
})
export class StateSignupComponent implements OnInit {
    @ViewChild('clone') template;
    @ViewChild('container', {read: ViewContainerRef}) container;
    currentJustify = 'fill';
    validation: any;
    office_seek: any = 'select';
    role: any;
    inputType:any = 'password';
    changeInputType:any;
    mismacth:boolean;

    numberMask: any;

    phoneNumberError: any;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    model1: any = {
        candiate_type: 'federal',
        office_state: '', office_state1: '', office_seek: ''
    };
    candidates = [];
    stateCandidatsModel1: any = {incumbent: false};
    stateCandidatsModel2: any = {incumbent: false};
    stateCandidatsModel3: any = {incumbent: false};
    stateCandidatsModel4: any = {incumbent: false};
    stateCandidatsModel5: any = {incumbent: false};
    stateCandidatsModel6: any = {incumbent: false};
    stateCandidatsModel7: any = {incumbent: false};
    stateCandidatsModel8: any = {incumbent: false};
    techModel: any = {technology_others: false};

    latestNewCsection = 1;
    showCsection2 = false;
    showCsection3 = false;
    showCsection4 = false;
    showCsection5 = false;
    showCsection6 = false;
    showCsection7 = false;
    showCsection8 = false;

    showTab2 = false;
    showTab3 = false;
    showTab4 = false;
    showTab5 = false;
    showTab6 = false;

    showStep5 = false;

    office_phone_error = false;
    campaign_manager_cell_phone_error = false;
    sc_phone1_error = false;
    sc_phone2_error = false;
    sc_phone3_error = false;
    sc_phone4_error = false;
    sc_phone5_error = false;
    sc_phone6_error = false;
    sc_phone7_error = false;
    sc_phone8_error = false;

    pageTitle: string = '';

    constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute, private resolver: ComponentFactoryResolver) {
    }
    groupCandidates(){
        this.candidates[0] = this.stateCandidatsModel1;
        if(this.showCsection2)
            this.candidates[1] = this.stateCandidatsModel2;
        if(this.showCsection3)
            this.candidates[2] = this.stateCandidatsModel3;
        if(this.showCsection4)
            this.candidates[3] = this.stateCandidatsModel4;
        if(this.showCsection5)
            this.candidates[4] = this.stateCandidatsModel5;
        if(this.showCsection6)
            this.candidates[5] = this.stateCandidatsModel6;
        if(this.showCsection7)
            this.candidates[6] = this.stateCandidatsModel7;
        if(this.showCsection8)
            this.candidates[7] = this.stateCandidatsModel8;
    }
    signupUser() {

        let technologies = [];
        technologies[0] = {'status':this.techModel.technology_calls_5, 'id':1};
        technologies[1] = {'status':this.techModel.technology_action_network, 'id':2};
        technologies[2] = {'status':this.techModel.technology_ballot_ready, 'id':3};
        technologies[3] = {'status':this.techModel.technology_countable, 'id':4};
        technologies[4] = {'status':this.techModel.technology_flipgrid, 'id':5};
        technologies[5] = {'status':this.techModel.technology_ground_game, 'id':6};
        technologies[6] = {'status':this.techModel.technology_hustle, 'id':7};
        technologies[7] = {'status':this.techModel.technology_mailchimp, 'id':8};
        technologies[8] = {'status':this.techModel.technology_mobilize_america, 'id':9};
        technologies[9] = {'status':this.techModel.technology_relay, 'id':10};
        technologies[10] = {'status':this.techModel.technology_smart_shoot, 'id':11};
        technologies[11] = {'status':this.techModel.technology_voter_circle, 'id':12};
        technologies[12] = {'status':this.techModel.technology_others, 'id':13};
        
        let userData = this.model1;
        userData.state_candidates = this.candidates;
        userData.technologies_used = technologies;

        var url = '/candidate/new';
        var datas = this.httpService.httpPost(url, userData).subscribe(
            data => {
                console.log(data);
                if (data['status'] == 'true') {
                    Swal('State candiate information has been updated successfully.');
                    this.router.navigate(['/state-candidate-home']);
                } else {
                    Swal('Unable to update state candidate information.');
                }
            }, error => console.log('There was an error: '));
    }

    enableTab(toshow) {
        if (toshow == 2)
            this.showTab2 = true;
        else if(toshow == 3)
            this.showTab3 = true;
        else if(toshow == 4)
            this.showTab4 = true;
        else if(toshow == 5)
            this.showTab5 = true;
        else if(toshow == 6)
            this.showTab6 = true;
    }
    showCandidateSection(section) {
        this.latestNewCsection = section + 1;
        const toshow = section + 1;
        if (toshow == 2)
            this.showCsection2 = true;
        else if(toshow == 3)
            this.showCsection3 = true;
        else if(toshow == 4)
            this.showCsection4 = true;
        else if(toshow == 5)
            this.showCsection5 = true;
        else if(toshow == 6)
            this.showCsection6 = true;
        else if(toshow == 7)
            this.showCsection7 = true;
        else
            this.showCsection8 = true;
    }
    deleteCandidateSection(section) {
        if (section == 2){
            this.showCsection2 = false;
            this.stateCandidatsModel2 = {incumbent: false};
        }else if(section == 3){
            this.showCsection3 = false;
            this.stateCandidatsModel3 = {incumbent: false};
        }else if(section == 4){
            this.showCsection4 = false;
            this.stateCandidatsModel4 = {incumbent: false};
        }else if(section == 5){
            this.showCsection5 = false;
            this.stateCandidatsModel5 = {incumbent: false};
        }else if(section == 6){
            this.showCsection6 = false;
            this.stateCandidatsModel6 = {incumbent: false};
        }else if(section == 7){
            this.showCsection7 = false;
            this.stateCandidatsModel7 = {incumbent: false};
        }else{
            this.showCsection8 = false;
            this.stateCandidatsModel8 = {incumbent: false};
        }

        if(this.showCsection2 == false &&
            this.showCsection3 == false &&
            this.showCsection4 == false &&
            this.showCsection5 == false &&
            this.showCsection6 == false &&
            this.showCsection7 == false &&
            this.showCsection8 == false){
                this.latestNewCsection = 1;
            }
    }
    phoneValidation(){
        this.office_phone_error = false;
        this.campaign_manager_cell_phone_error = false;
        this.sc_phone1_error = false;
        this.sc_phone2_error = false;
        this.sc_phone3_error = false;
        this.sc_phone4_error = false;
        this.sc_phone5_error = false;
        this.sc_phone6_error = false;
        this.sc_phone7_error = false;
        this.sc_phone8_error = false;
        if( this.model1.office_phone.replace(/[^0-9]/g,'').length < 10) {
            this.office_phone_error=true;
        }if( this.model1.campaign_manager_cell_phone.replace(/[^0-9]/g,'').length < 10) {
            this.campaign_manager_cell_phone_error=true;
        }else if( this.stateCandidatsModel1.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone1_error=true;
        }else if( this.stateCandidatsModel2.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone2_error=true;
        }else if( this.stateCandidatsModel3.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone3_error=true;
        }else if( this.stateCandidatsModel4.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone4_error=true;
        }else if( this.stateCandidatsModel5.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone5_error=true;
        }else if( this.stateCandidatsModel6.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone6_error=true;
        }else if( this.stateCandidatsModel7.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone7_error=true;
        }else if( this.stateCandidatsModel8.phone.replace(/[^0-9]/g,'').length < 10) {
            this.sc_phone8_error=true;
        }
    }
changeType(){
        this.changeInputType = !this.changeInputType;
        if( this.changeInputType){
            this.inputType = 'text';
        }else{
            this.inputType = 'password';
        }
        
    }

      pwdMatchValidator() {
    if(this.model1.password != this.model1.password1){
       this.mismacth = true;
    }else{
        this.mismacth = false;
    }
 }
    ngOnInit() {
        // First, you need to create the `numberMask` with your desired configurations
        this.numberMask = createNumberMask({
            prefix: '',
            suffix: ''
        });

        this.route.params.subscribe(data => {
            console.log(data);
            this.httpService.httpGet('/users/getUserSignupInfo/' + data.token).subscribe(data => {
                this.model1 = data['data']['0'];
                this.role = this.model1.role_id;
                this.model1.office_email = this.model1.email;
                if (this.model1.role_id == 3) {
                    this.model1.candiate_type = 'federal';
                    this.showStep5 = true;
                } else if (this.model1.role_id == 4) {
                    this.model1.candiate_type = 'state';
                }
            });
        });
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
    numberOnlyDPI(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            // this.validation = 'Please enter a valid number';
            return false;
        }else if(event.target.value > 100){
            // this.validation = 'The value should not exceed 100';
            event.target.value = 0;
            return false;
        }else{
            this.validation = ' ';
            return true;
        }

    }
    phoneNumberSplit(event) {

        var phonenum = event.value;
        var pnLength = phonenum.length;

        var lastValue = phonenum.substring(pnLength - 1);

        if (this.isNumber(lastValue)) {
            var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (regexObj.test(phonenum)) {
                var parts = phonenum.match(regexObj);
                var phone = '';
                if (parts[1]) {
                    phone += '+1 (' + parts[1] + ') ';
                }
                phone += parts[2] + '-' + parts[3];
                event.value = phone;
            } else {
                //invalid phone number
                event.value = phonenum;
            }
        } else {
            var prefixText = phonenum.substring(0, pnLength - 1);
            event.value = prefixText;
        }
    }

    isNumber(value: string | number): boolean {
        return !isNaN(Number(value.toString()));
    }
}


