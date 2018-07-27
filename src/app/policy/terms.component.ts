import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./policy.component.css']
})
export class TermsComponent implements OnInit {

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
