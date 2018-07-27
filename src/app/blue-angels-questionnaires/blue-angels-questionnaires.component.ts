import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blue-angels-questionnaires',
  templateUrl: './blue-angels-questionnaires.component.html',
  styleUrls: ['./blue-angels-questionnaires.component.css'],
  providers: [HttpService, AuthService]
})
export class BlueAngelsQuestionnairesComponent implements OnInit {
  candidates: any = [];
  title: string;
  constructor(private httpService: HttpService, private http: HttpClient,
    private localStorageService: LocalStorageService,
    private authservice: AuthService, private location: Location, private router: Router,
              private route: ActivatedRoute) {
      if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
      }
    }

  getCandidateList(){
    var url='/candidate/getCandidatesForReview/'+this.localStorageService.get('userId');
    var mythis = this;
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.candidates = data['data'];
    });
  }

  ngOnInit() {
      this.title = this.route.snapshot.data['title'];
      this.getCandidateList();
  }

}
