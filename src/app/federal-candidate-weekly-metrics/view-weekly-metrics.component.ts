/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-federal-candidate-view-weekly-metrics',
    templateUrl: './view-weekly-metrics.component.html',

    providers: [AuthService]
})
export class ViewWeeklyMetricsComponent implements OnInit {

    weeklyMetrics: any = {};
    locationSer: any;

    constructor(private route: ActivatedRoute, private http: HttpClient, private authservice: AuthService,
         private location: Location, private router: Router) {
        this.locationSer = location;
        if(this.authservice.isUserLoggedIn() == false){
            this.location.replaceState('/');
            this.router.navigate(['/signin']);
        }
    }

    viewMetric(id) {
        var url = '/weeklyMetrics/getById/' + id;
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                console.log(data['data']['metrics']);
                this.weeklyMetrics = data['data'];
            });
    }

    ngOnInit() {
        this.viewMetric(this.route.snapshot.paramMap.get('id'));
    }

}
