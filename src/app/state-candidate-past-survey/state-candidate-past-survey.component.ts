/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-state-candidate-past-survey',
  templateUrl: './state-candidate-past-survey.component.html',
  styleUrls: ['./state-candidate-past-survey.component.css'],
  providers: [AuthService]
})
export class StateCandidatePastSurveyComponent implements OnInit {

  events: any = [];
  constructor( private http: HttpClient, private authservice: AuthService, 
    private location: Location, private router: Router) { 
    if(this.authservice.isUserLoggedIn() == false){
      this.location.replaceState('/');
      this.router.navigate(['/signin']);
    }
  }

  getCandidateList(){
    var url='/events/getAll';
    var mythis = this;
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.events = data['data'];
    });
  }

  ngOnInit() {
      this.getCandidateList();
  }

}
