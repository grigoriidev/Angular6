/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-federal-candidate-weekly-metrics',
    templateUrl: './federal-candidate-weekly-metrics.component.html',
    styleUrls: ['./federal-candidate-weekly-metrics.component.css'],
    providers: [AuthService]
})
export class FederalCandidateWeeklyMetricsComponent implements OnInit {
    
    activePeriod: any = {canCreateNewMetrics:true};
    activePeriods: any = [];
    inactivePeriods: any = [];
    metric: any = {};

    constructor(private http: HttpClient, private authservice: AuthService,
         private location: Location, private router: Router) {
        if(this.authservice.isUserLoggedIn() == false){
            this.location.replaceState('/');
            this.router.navigate(['/signin']);
        }
    }
    getActivePeriod() {
        var url = '/weeklyMetrics/getActivePeriod';
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                this.activePeriods = data['data'];
                this.activePeriod = data['data'][0];
                if(data['data'][0].canCreateNewMetrics == 'false')
                    this.activePeriod.canCreateNewMetrics = false;
            });
    }
    getInactivePeriods() {
        var url = '/weeklyMetrics/getAllInactivePeriods';
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                this.inactivePeriods = data['data'];
            });
    }

    ngOnInit() {
        this.getActivePeriod();
        this.getInactivePeriods();
    }

}
