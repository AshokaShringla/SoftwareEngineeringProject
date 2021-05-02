import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../endpoints/endpoints.service';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _httpService: HttpClient, private endpoints: EndpointsService) { }

  getMyNotes(user: User): Observable<any>{
    return this._httpService.post(this.endpoints.GET_MNOTES, user)
  }

  getSharedNotes(user: User): Observable<any>{
    return this._httpService.post(this.endpoints.GET_SNOTES, user)
  }

}
