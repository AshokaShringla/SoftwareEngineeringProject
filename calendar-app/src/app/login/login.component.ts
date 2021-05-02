import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private router:Router, private _loginService:LoginService, 
    private _contextService:ContextService) { }

  ngOnInit(): void {
  }

  login(){
    this._loginService.loginAuthentication(this.user).subscribe((userData) => {
      this.user = <User>userData; this.loginAuth(this.user);
    })
  }

  loginAuth(user: User){
    if (user != null){
      this._contextService.store(user);
      this.router.navigateByUrl('userHome')
    }
    else{
      this.reset();
    }

  }
  private reset(){
      this.user = null;
  }

}
