import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  public readonly authURL = environment.url; 

  /** Register User */
  public readonly REGISTER_USER: string = this.authURL + 'user/signup';
  /** Login User*/
  public readonly LOGIN_USER: string = this.authURL + 'users/login';
  // Get all my notes
  public readonly GET_MNOTES: string = this.authURL + 'notes/mynotes';
  // Get all notes shared with me
  public readonly GET_SNOTES: string = this.authURL + 'notes/sharednotes';
   // delete note
   public readonly DELETE_NOTE: string = this.authURL + 'notes/';

  constructor(private http: HttpClient) { }
   /** Test method for printing out JSON at any given URL 
    * @param uri
   */

  public printJSON(uri: string): any {
    let obs = this.http.get<any>(uri);
    obs.subscribe(
       (response) => {
          console.log(response);
       },
       (response) => {
          console.log('failed');
       }
    )
 }
}
