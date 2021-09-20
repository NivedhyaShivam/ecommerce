import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
   }

  getMembersData() {
    console.log('APi service', this.apiUrl)
    return this.httpClient.get(`${this.apiUrl}`)
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
  }
}
