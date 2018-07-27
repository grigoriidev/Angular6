/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-state-candidate-header',
  templateUrl: './state-candidate-header.component.html',
  providers: [AuthService]
})
export class StateCandidateHeaderComponent implements OnInit {

  constructor(private authservice: AuthService) { }
  
  getPermissionStatus(key_alias){
    return this.authservice.getPermissionStatus(key_alias);
  }

  ngOnInit() {
  }

}
