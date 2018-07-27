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
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { LocalStorageService } from 'angular-2-local-storage';

import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
  selector: 'app-federal-candidate-create-events',
  templateUrl: './federal-candidate-create-events.component.html',
    styleUrls: ['./federal-candidate-weekly-metrics.component.css'],
  providers: [HttpService, DateFormatService, AuthService]
})
export class FederalCandidateCreateEventsComponent implements OnInit {

  eventTypes: any = [];
  stateLegislators: any = [];
  metric: any = {};
  event1: any = {};
  event2: any = {};
  event3: any = {};

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  showNewEventRow2 = false;
  showNewEventRow3 = false;
  locationSer: any;

  constructor(private httpService: HttpService, private http: HttpClient, 
    private dfService: DateFormatService, private authservice: AuthService,
     private location: Location, private router: Router, private route: ActivatedRoute,
     private localStorageService: LocalStorageService) { 
      this.locationSer =location;
      if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
      }
    }

  getEventTypes(){
    var url='/events/getEventTypesForDropdown';
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.eventTypes = data['data'];
    });
  }
  getStateLegislators(){
    var url='/weeklyMetrics/getStateCandidatesForDropdown';
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.stateLegislators = data['data'];
    });
  }
  createNewEvent(){
    let events =  [];
    
    events[0] =  this.event1;
    // events[1] =  this.event2;
    // events[2] =  this.event3;
    if(this.event1.event_date != undefined)
      events[0].event_date = this.dfService.formatDateForMysql(this.event1.event_date.jsdate);
    // if(this.event2.event_date != undefined)
    //   events[1].event_date = this.dfService.formatDateForMysql(this.event2.event_date.jsdate);
    // if(this.event3.event_date != undefined)
    //   events[2].event_date = this.dfService.formatDateForMysql(this.event3.event_date.jsdate);

    let userData= this.metric;
    userData.all_events = events;
    userData.loggedin_user_id = this.localStorageService.get('userId');
    userData.loggedin_acct_id = this.localStorageService.get('acct_id');
    userData.loggedin_camp_id = this.localStorageService.get('camp_id');
    console.log(userData);
    var url='/weeklyMetrics/createNewEvent';
    var datas=this.httpService.httpPost(url,userData).subscribe(
      data =>{
        console.log(data);
        if(data['status'] == 'true'){
          Swal("Successfully created new event.");
          this.router.navigate(['federal-candidate-weekly-metrics']);
        }else{
          Swal("Unable to create new event.");
        }
      }, error => console.log('Error: Unable to create new event.')
    );
  }

  showNewEventRow(section){
    if(section == 2)
      this.showNewEventRow2 = true;
    else
      this.showNewEventRow3 = true;
  }

  ngOnInit() {
      this.getEventTypes();
      this.getStateLegislators();
      this.metric.period_id = this.route.snapshot.paramMap.get('id');
  }

}
