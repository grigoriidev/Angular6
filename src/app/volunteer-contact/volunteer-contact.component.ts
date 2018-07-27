import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpService} from '../http/http.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'app-volunteer-contact',
  templateUrl: './volunteer-contact.component.html',
  styleUrls: ['./volunteer-contact.component.css'],
  providers: [HttpService, AuthService]
})
export class VolunteerContactComponent implements OnInit {

  model1: any = {};
    office_state1:any ='select';
     calendarOptions: {};
    validation:any;
    office_phone_error:boolean;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private httpService: HttpService, 
    private localStorageService: LocalStorageService, private http: HttpClient, 
    private authservice: AuthService, private location: Location, private router: Router) { 
      if(this.authservice.isUserLoggedIn() == false){
        this.location.replaceState('/');
        this.router.navigate(['/signin']);
      }
    }
  phoneValidation(){
        this.office_phone_error = false;
        if( this.model1.office_phone.replace(/[^0-9]/g,'').length < 10) {
            this.office_phone_error=true;
        }
    }
  getPermissionStatus(key_alias){
    return this.authservice.getPermissionStatus(key_alias);
  }

  getUserDetails(){
    var url='/users/getById/'+this.localStorageService.get('userId');
    var mythis = this;
    this.http.get(environment.hostname+url)
    .subscribe((data) => {
        console.log(data);
        this.model1 = data['data'];
        this.model1.office_email=data['data'].email;
    });
  }
  updateProfile(){
      let userData = this.model1;
      var url = '/users/updateProfile';
      var datas = this.httpService.httpPost(url, userData).subscribe(
          data => {
              console.log(data);
              if (data['status'] == 'true') {
                  Swal('Information has been updated successfully.');
                  this.getUserDetails();
              } else {
                  Swal('Unable to update user.');
              }
          }, error => console.log('There was an error: ')
      );
  }
  ngOnInit() {
    this.getUserDetails();
    this.calendarOptions = {
            editable: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            // events: data
        };
  }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;

        }

        return true;

    }
}
