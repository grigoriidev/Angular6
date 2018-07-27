/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
    
   }
   httpGet(url:string) {
    let httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get(environment.hostname+url,{
        headers: httpHeaders,
        responseType: 'json'
      });
  }
  httpPost(url:string,param: any){
    console.log('Calling Post Method');
    let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json'
    });  
    return this.http.post(environment.hostname+url, param, {headers:httpHeaders});
    }
}