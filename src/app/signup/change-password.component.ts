import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {HttpService} from '../http/http.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';

import {LocalStorageService} from 'angular-2-local-storage';
import { Location } from '@angular/common';



@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    providers: [HttpService,AuthService]
})
export class ChangePassowrdCoponent implements OnInit{

    inputType:any = 'password';
    changeInputType:any;
    model1:any={};
    mismacth:boolean;

    constructor(private router: Router,private location: Location,private authservice: AuthService,private httpService: HttpService,private localStorageService: LocalStorageService,){}


    ngOnInit() {
    }
    changeType(){
        this.changeInputType = !this.changeInputType;
        if( this.changeInputType){
            this.inputType = 'text';
        }else{
            this.inputType = 'password';
        }
        
    }
    pwdMatchValidator() {
    if(this.model1.password != this.model1.confirm){
       this.mismacth = true;
    }else{
        this.mismacth = false;
    }
 }
    changePassword(){
        this.model1.user_id = this.localStorageService.get('userId');
        var url = '/users/changepasswd';
        if(this.model1.password){
            var datas = this.httpService.httpPost(url, this.model1).subscribe(
                data => {
                    console.log(data);
                    if (data['status'] == 'true') {
                        Swal('The password has been changed successfully.');
                        this.authservice.logoutUser();
                        this.router.navigate(['/signin']);
                    } else if (data['status'] == 'incorrectpwd') {
                        Swal('Current Password is incorrect.');
                        this.model1 = {};
                    } else if (data['status'] == 'insecurepwd') {
                        Swal('Your new passsword must be different from the old password.');
                        this.model1 = {};
                    } else {
                        Swal('Unable to change password.');
                    }
                }, error => console.log('There was an error: ')
            );
        }
        else{
            Swal("Enter the password");
        }
       
  }
    goBack() {
        this.location.back();
        console.log( 'goBack()...' );
      }
}