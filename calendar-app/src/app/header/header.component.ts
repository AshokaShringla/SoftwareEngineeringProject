import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _contextService:ContextService) { }

  ngOnInit(): void {
  }

  ifLogged(){
    if (localStorage.getItem("logged") == "true"){
      return true;
    }
    return false;
  }

  logout(){
    this._contextService.logout();
  }

}
