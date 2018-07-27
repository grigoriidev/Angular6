import {Injectable, Output} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {
    isLoggedIn: boolean;
    nameChange: Subject<boolean> = new Subject<boolean>();
    userroleid: Number;

    constructor(private localStorageService: LocalStorageService) {
        this.isLoggedIn = this.localStorageService.get('isUserLoggedIn');
    }

    change() {
        this.isLoggedIn = this.localStorageService.get('isUserLoggedIn');
        this.nameChange.next(this.isLoggedIn);
    }
}
