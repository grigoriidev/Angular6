import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {HttpService} from '../http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prior-pledges',
  templateUrl: './prior-pledges.component.html',
  providers: [HttpService, AuthService]
})
export class PriorPledgesComponent implements OnInit {

  priorPledges: any = [];
  showInvestorHeader = false;
  showBlueAngelHeader = false;
  showVolunteerHeader = false;

  constructor( private http: HttpClient, private authservice: AuthService, private httpService: HttpService,
    private localStorageService: LocalStorageService, private location: Location, private router: Router) { 
      if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
      }
    }

  getPermissionStatus(key_alias){
    return this.authservice.getPermissionStatus(key_alias);
  }

  getCandidateList(){
    var url='/investorsPledge/prior/getByInvestorId/'+this.localStorageService.get('acct_id');
    var mythis = this;
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.priorPledges = data['data'];
    });
  }
  deleteContribution(id) {
    Swal({
      title: 'Are you sure?',
      text: 'You want to delete this contribution?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let userData = {};
        userData['id'] = id;
        var url = '/investorsPledge/prior/delete';
        var datas = this.httpService.httpPost(url, userData).subscribe(
            data => {
                if (data['status'] == 'true') {
                    // Swal('Successfully deleted contribution.');
                    this.getCandidateList();
                } else {
                    Swal('Unable to delete contribution.');
                }
            }, error => console.log('Error: Unable to delete contribution.')
        );     
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Cancelled');
      }
    });  
  }
  ngOnInit() {
      this.getCandidateList();
      if(this.localStorageService.get('role_id') == 1){
        this.showBlueAngelHeader = true;
      }else if(this.localStorageService.get('role_id') == 2){
        this.showInvestorHeader = true;
      }else if(this.localStorageService.get('role_id') == 6){
        this.showVolunteerHeader = true;
      }
  }

}
