/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-investor-contribution',
  templateUrl: './investor-contribution.component.html',
  styleUrls: ['./investor-contribution.component.css'],
  providers: [AuthService]
})
export class InvestorContributionComponent implements OnInit {

  constructor(private authservice: AuthService, private location: Location, private router: Router) { 
    if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
    }
  }

  ngOnInit() {
  }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;

        }
        return true;

    }
}
