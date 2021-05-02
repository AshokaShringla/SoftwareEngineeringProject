import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  private tokenEmail: string;
  private tokenPass: string;

  store(user:User) {
    localStorage.setItem(this.tokenEmail, user.email)
    localStorage.setItem(this.tokenPass, user.password)
    localStorage.setItem("logged", "true")
  }

  logout(){
    localStorage.setItem(this.tokenEmail, null)
    localStorage.setItem(this.tokenPass, null)
    localStorage.setItem("logged", "false")    
  }

  getEmail(){
    return localStorage.getItem(this.tokenEmail);
  }

  getPass(){
    return localStorage.getItem(this.tokenPass);
  }



}


