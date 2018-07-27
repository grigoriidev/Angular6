/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-federal-candidate-past-metrics',
  templateUrl: './federal-candidate-past-metrics.component.html',
  styleUrls: ['./federal-candidate-past-metrics.component.css'],
  providers: [AuthService]
})
export class FederalCandidatePastMetricsComponent implements OnInit {

  constructor(private authservice: AuthService, private location: Location, private router: Router) { 
    if(this.authservice.isUserLoggedIn() == false){
      this.location.replaceState('/');
      this.router.navigate(['/signin']);
    }
  }

  ngOnInit() {
  }

}
