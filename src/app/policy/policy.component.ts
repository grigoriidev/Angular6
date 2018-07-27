import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }
    backClicked() {
        this._location.back();
    }
    homeClicked() {
        this.router.navigate(['/']);
    }
}
