/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */

import { Component } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {SharedService} from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoggedIn: boolean;
  _subscription: any;
    constructor(private localStorageService: LocalStorageService, private sharedService: SharedService) {
        this.isLoggedIn = this.localStorageService.get('isUserLoggedIn');
        this._subscription = sharedService.nameChange.subscribe((value) => {
            this.isLoggedIn = value;
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this._subscription.unsubscribe();
    }
}
