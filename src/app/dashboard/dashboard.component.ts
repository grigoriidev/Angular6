/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]

})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private authservice: AuthService) { }
  getPermissionStatus(key_alias){
    return this.authservice.getPermissionStatus(key_alias);
  }
  logoutUser(){
	  this.authservice.logoutUser();
	  this.router.navigate(['/signin']);
  }
  ngOnInit() {      
    if(this.authservice.getPermissionStatus('investorContactPaymentInformation') == false){
        this.router.navigate(['/access-denied']);
    }
  }

}
