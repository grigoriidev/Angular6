/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {environment} from '../../environments/environment';

@Injectable()
export class DropdownValuesService {

    constructor(private http: HttpClient) {
    }

    getRoles(invitor_role_id) {
        return this.http.get(environment.hostname + '/roles/getRolesForDropdown/' + invitor_role_id);
    }

    getRatings() {
        return this.http.get(environment.hostname + '/candidate/getRatingsForDropdown');
    }

}
