import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  user = new User();

  constructor(
    private _contextService:ContextService) { }

  ngOnInit(): void {
    if(localStorage.getItem("logged")=="true"){
      this.user.email = this._contextService.getEmail();
      this.user.password = this._contextService.getPass();
      this.user.token = this._contextService.getToken();

      console.log(this.user)

    }
    

  }

}
