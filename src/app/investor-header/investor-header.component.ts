import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-investor-header',
  templateUrl: './investor-header.component.html',
  providers: [AuthService]
})
export class InvestorHeaderComponent implements OnInit {

  constructor(private authservice: AuthService) { }
  
  getPermissionStatus(key_alias){
    return this.authservice.getPermissionStatus(key_alias);
  }

  ngOnInit() {
  }

}
