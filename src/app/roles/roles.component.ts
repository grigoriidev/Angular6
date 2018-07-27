/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import {Component, OnInit, ElementRef, Pipe} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import {environment} from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  providers: [HttpService, AuthService]
})
@Pipe({
  name: 'keys'
})
export class RolesComponent implements OnInit {
  Roles: any=[];
  recordCount: number = 0;
  url='';
  p: any;
  constructor(private router: Router,private httpService: HttpService,
    private authservice: AuthService, private location: Location, private userData: SharedService) {
    if(this.authservice.isUserLoggedIn() == false){
      this.location.replaceState('/');
      this.router.navigate(['/signin']);
    }
    if(this.userData.userroleid !==5) {

      window.history.back();
      alert("Access Dennied!");
    }
  }

  getRoles() {
    var url='/roles/getAll'
    this.httpService.httpGet(url)
    .subscribe((data) => {
        console.log(data);
        this.Roles=data['data'];
        this.recordCount = data['data'].length;
    });
  }

  ngOnInit() {
    this.getRoles();
    this.url=environment.resourceUrl+"/getPermissionsByRoles/";
  }
}
