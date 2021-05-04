import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../endpoints/endpoints.service';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
  connectedCustomer: User;
    constructor(private _httpService: HttpClient, private endpoints: EndpointsService) {}

    loginAuthentication(user:User): Observable<any>{
      let body = JSON.parse(JSON.stringify(user));
      console.log(body);

      return this._httpService.post(this.endpoints.LOGIN_USER, body)
      // .pipe(catchError(this.handleError)

    }

    register(user:User): Observable<any>{
      let body = JSON.parse(JSON.stringify(user));
      console.log(body);

      return this._httpService.post(this.endpoints.REGISTER_USER, body)
    }

    // handleError(error){
    //   return error;
    // }

}
