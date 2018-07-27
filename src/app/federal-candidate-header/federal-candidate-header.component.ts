import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-federal-candidate-header',
    templateUrl: './federal-candidate-header.component.html',
    styleUrls: ['./federal-candidate-header.component.css'],
    providers: [AuthService]

})
export class FederalCandidateHeaderComponent implements OnInit {

    constructor(private authservice: AuthService) {
    }

    getPermissionStatus(key_alias) {
        return this.authservice.getPermissionStatus(key_alias);
    }

    ngOnInit() {
    }

}
