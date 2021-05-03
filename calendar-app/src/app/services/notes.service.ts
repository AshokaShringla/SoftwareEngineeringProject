import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../endpoints/endpoints.service';
import { User } from '../models/user.model'
import { Notes } from '../models/notes.model'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _httpService: HttpClient, private endpoints: EndpointsService) { }

  getMyNotes(user: User): Observable<any>{
    return this._httpService.post(this.endpoints.GET_MNOTES + '/' + user.token, user)
  }

  getSharedNotes(user: User): Observable<any>{
    return this._httpService.post(this.endpoints.GET_SNOTES + '/' + user.token, user)
  }

  deleteNote(user: User, id: number): Observable<any>{
    return this._httpService.get(this.endpoints.DELETE_NOTE + '/' + user.token + '/' + id)
  }

  addNote(user: User, note: Notes): Observable<any>{
    return this._httpService.post(this.endpoints.DELETE_NOTE + '/' + user.token + '/' + user.email, note)
  }

  shareNote(user: User, id: number, share: string): Observable<any>{
    return this._httpService.get(this.endpoints.DELETE_NOTE + '/' + user.token + '/' + id + share)
  }

}
