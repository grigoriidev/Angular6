/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import {Component, OnInit, ElementRef, Pipe} from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../http/http.service';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {SharedService} from '../services/shared.service';
@Component({
  selector: 'app-permission-allotment',
  templateUrl: './permission-allotment.component.html',
  
  styleUrls: ['./permission-allotment.component.css'],
  providers: [HttpService, AuthService]

})
@Pipe({
  name: 'keys'
})
export class PermissionAllotmentComponent implements OnInit {
  PermissionAllotments: any[];
  message:any;
  messageType:any;
  updateStatusData: any = {};
  role_id='';
  permission_allotment_data:any={};
  constructor(private router: Router,private route: ActivatedRoute,private httpService: HttpService,
    private authservice: AuthService, private location: Location, private userData: SharedService) {
    if(this.authservice.isUserLoggedIn() == false){
      this.location.replaceState('/');
      this.router.navigate(['/signin']);
    }
    if(this.userData.userroleid !==5) {

      window.history.back();
      alert("Access Dennied!");
    }

  }

  getPermissionAllotments(role_id) {
    var url='/permissionAllotments/getPermissionAllotmentsByRoleId/'+role_id
    this.httpService.httpGet(url).subscribe(data=>{
      var tmp = data['data'];
      var i=0;
      var temparray=[];
      var newarray=[];
      tmp.forEach(function(row){
        temparray.push(row);
        i++;
        if(i % 3 == 0){
          newarray.push({"page_name": temparray[0].page_name,
            "allotment_id_0": temparray[0].id,
            "status_0": (temparray[0].status == 1)?true:false,
            "allotment_id_1": temparray[1].id,
            "status_1": (temparray[1].status == 1)?true:false,
            "allotment_id_2": temparray[2].id,
            "status_2": (temparray[2].status == 1)?true:false,
            });
          i=0;
          temparray = [];
        }
      });
      this.PermissionAllotments = newarray;
    });
  }

  confirmUpdate(id, $event){
    let status=$event.target.checked;
    this.updateStatusData.id = id;
    this.updateStatusData.status = status;
    this.updateStatusData.event = $event;
  }
  cancelUpdate(){
    let status=this.updateStatusData.event.target.checked;
    if(status == true){
      this.updateStatusData.event.target.checked = false;
    }else{
      this.updateStatusData.event.target.checked = true;
    }
  }

  updatePermission(id, $event){
    let status=$event.target.checked;
    var cnf = confirm("Are you sure want to update status?");
    if(cnf == true){
      this.permission_allotment_data = {
        id: id,
        status:status
      };
      var url='/permissionallotment/update';
      var datas=this.httpService.httpPost(url,this.permission_allotment_data).subscribe(
        data =>{
          if(data['status'] == 'true'){
            this.getPermissionAllotments(this.role_id);
          }else{
            console.log('Erro: while updating permission status!');
          }
        }, error => console.log('Erro: while updating permission status!')
      );
    }else{
      // Reset the check box to its default status
      if(status == true){
        $event.target.checked = false;
      }else{
        $event.target.checked = true;
      }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(data=>{
      this.role_id=data.role_id;
      console.log(data)
      this.getPermissionAllotments(data.role_id);
    });     
  }
}
