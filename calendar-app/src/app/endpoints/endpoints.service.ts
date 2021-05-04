import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  public readonly authURL = environment.url;

  // Register User
  public readonly REGISTER_USER: string = this.authURL + 'user/signup';
  // Login User
  public readonly LOGIN_USER: string = this.authURL + 'user/signin';
  // Get all my notes
  public readonly GET_MNOTES: string = this.authURL + 'note';
  // Get all notes shared with me
  public readonly GET_SNOTES: string = this.authURL + 'note/shared';
   // delete note
   public readonly DELETE_NOTE: string = this.authURL + 'note/delete';
   // delete note
   public readonly ADD_NOTE: string = this.authURL + 'note';
   // delete note
   public readonly SHARE_NOTE: string = this.authURL + 'note/shared';

  constructor(private http: HttpClient) { }
}
