/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HttpService} from '../http/http.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {DropdownValuesService} from '../services/dropdown-values.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

// const Swal = require('sweetalert2');

@Component({
  selector: 'app-review-candidate',
  templateUrl: './review-candidate.component.html',
  styleUrls: ['./review-candidate.component.css'],
  providers: [HttpService, DropdownValuesService, AuthService]
})
export class ReviewCandidateComponent implements OnInit {
    model1: any = {}; // candidate info
    reviewerModel: any = {};
    alreadyReviewed = false;
    ratings: any = [];
    locationSer: any;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, 
    private http: HttpClient, private httpService: HttpService, private localStorageService: LocalStorageService, 
    private dpservice: DropdownValuesService, private authservice: AuthService) {
      this.locationSer = location;
      if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
      }
    }
  
  getRatings() {
    this.dpservice.getRatings().subscribe(
        data => {
            this.ratings = data['data'];
        }, error => {
            console.log('error: unable to get roles dropdown values');
        }
    );
  }

    getCandidateDetails() {
        const id = +this.route.snapshot.paramMap.get('id');
        var url = '/candidate/getByIdForReview/' + id + '/' + this.localStorageService.get('userId');
        var mythis = this;
        this.http.get(environment.hostname + url)
            .subscribe((data) => {
                console.log(data);
                this.model1 = data['data'][0];
                this.reviewerModel.candidate_id = this.model1.camp_id;
                if (this.model1.rating_available == true) {
                    this.reviewerModel = this.model1.ratings;
                    this.alreadyReviewed = true;
                }
                // Setting up technologies
                this.model1.technologies_used.map((row)=>{
                    if(row.camptecs_id == 1)
                        this.model1.technology_calls_5 = true;
                    if(row.camptecs_id == 2)
                        this.model1.technology_action_network = true;
                    if(row.camptecs_id == 3)
                        this.model1.technology_ballot_ready = true;
                    if(row.camptecs_id == 4)
                        this.model1.technology_countable = true;
                    if(row.camptecs_id == 5)
                        this.model1.technology_flipgrid = true;
                    if(row.camptecs_id == 6)
                        this.model1.technology_ground_game = true;
                    if(row.camptecs_id == 7)
                        this.model1.technology_hustle = true;
                    if(row.camptecs_id == 8)
                        this.model1.technology_mailchimp = true;
                    if(row.camptecs_id == 9)
                        this.model1.technology_mobilize_america = true;
                    if(row.camptecs_id == 10)
                        this.model1.technology_relay = true;
                    if(row.camptecs_id == 11)
                        this.model1.technology_smart_shoot = true;
                    if(row.camptecs_id == 12)
                        this.model1.technology_voter_circle = true;
                    if(row.camptecs_id == 13){
                        this.model1.technology_others = true;
                        this.model1.technology_others_description = row.camptec_other;
                    }
                        
                        
                });
            });
    }

    showIfThisTechSelected(id){
        this.model1.technologies_used.map((row)=>{
            
            if(row.camptecs_id == id){
                console.log(row.camptecs_id);
                return true;
            }
        });

        return false;
    }

    submitComment() {
        this.reviewerModel.commented_user_id = this.localStorageService.get('userId');
        let userData = this.reviewerModel;
        var url = '/candidate/submitReviewerComment';
        var datas = this.httpService.httpPost(url, userData).subscribe(
            data => {
                console.log(data);
                if (data['status'] == 'true') {
                    Swal('Successfully submitted the comments.');
                    this.reviewerModel = {};
                    this.router.navigate(['/blue-angels-review']);
                } else {
                    Swal('Unable to submitted comments.');
                }
            }, error => console.log('There was an error: ')
        );
    }

    ngOnInit() {
        this.getCandidateDetails();
        this.getRatings();
    }

}
