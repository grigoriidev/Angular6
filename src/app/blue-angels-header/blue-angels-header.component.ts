import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-blue-angels-header',
  templateUrl: './blue-angels-header.component.html',
    styleUrls: ['./blue-angels-header.component.css'],
  providers: [AuthService]
})
export class BlueAngelsHeaderComponent implements OnInit {

  constructor(private authservice: AuthService) { }
  
  getPermissionStatus(key_alias){
    return this.authservice.getPermissionStatus(key_alias);
  }

  ngOnInit() {
  }

}
