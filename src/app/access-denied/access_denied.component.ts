/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import {Component, OnInit, Pipe} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-collection',
  templateUrl: './access_denied.component.html',
  providers: []
})
@Pipe({
  name: 'keys'
})
export class AccessDeniedComponent implements OnInit {

  constructor( private router: Router) {  }
  goBack(){
        this.router.navigate(['/signin']);
  }
  ngOnInit() {
	  this.router.navigate(['/signin']);
  }

}
