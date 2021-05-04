import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../endpoints/endpoints.service';
import { User } from '../models/user.model'
import { Notes } from '../models/notes.model'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  note1 = new Notes();

  constructor(private _httpService: HttpClient, private endpoints: EndpointsService) { }

  getMyNotes(user: User): Observable<any>{
    return this._httpService.get(this.endpoints.GET_MNOTES, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  getSharedNotes(user: User): Observable<any>{
    return this._httpService.post(this.endpoints.GET_SNOTES + '/' + user.token, user)
  }

  deleteNote(user: User, id: number): Observable<any>{
    this.note1.id = id;
    return this._httpService.post(this.endpoints.DELETE_NOTE, this.note1 ,{headers: new HttpHeaders({'Authorization' : user.token})});
  }

  addNote(user: User, note: Notes): Observable<any>{
    return this._httpService.post(this.endpoints.ADD_NOTE, note, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  shareNote(user: User, id: number, share: string): Observable<any>{

    const body = { "note_id": id, "share_user_email": share};

    return this._httpService.post(this.endpoints.SHARE_NOTE, body, {headers: new HttpHeaders({'Authorization' : user.token})});
  }
}
