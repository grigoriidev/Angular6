/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {IMyDpOptions} from 'mydatepicker';
import {DateFormatService} from '../services/dateformat.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
  selector: 'app-federal-candidate-create-survey',
  templateUrl: './state-candidate-create-survey.component.html',
    styleUrls: ['./state-candidate-weekly-survey.component.css'],
  providers: [HttpService, DateFormatService, AuthService]
})
export class StateCandidateCreateSurveyComponent implements OnInit {

  campaigns: any = [];
  survey: any = {};
  locationSer: any;
  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private httpService: HttpService, private http: HttpClient
              , private dateFormatService: DateFormatService, private router: Router,
  private location: Location, private authservice: AuthService) {
    this.locationSer = location;
    if(this.authservice.isUserLoggedIn() == false){
      this.location.replaceState('/');
      this.router.navigate(['/signin']);
    }
  }

  getCampaigns(){
    var url='/candidate/getCandidatesForDropdown';
    var mythis = this;
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.campaigns = data['data'];
    });
  }

  createNewSurvey(){
    let userData= this.survey;
    var url='/weeklySurvey/new';
    var datas=this.httpService.httpPost(url,userData).subscribe(
      data =>{
        console.log(data);
        if(data['status'] == 'true'){
          Swal("Successfully created new survey.");
          this.router.navigate(['state-candidate-weekly-survey']);
        }else{
          Swal("Error: Unable to create new survey.");
        }
      }, error => console.log('Error: Unable to create new survey.')
    );
  }

  ngOnInit() {
      this.getCampaigns();
  }

}
