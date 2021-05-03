import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '../services/context.service';
import { Notes } from '../models/notes.model';
import { NotesService } from 'src/app/services/notes.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  user: User;
  note: Notes;
  mynotes:Notes[]
  sharednotes:Notes[]
  statusMessage:string

  share: string;

  constructor(private router:Router,
    private _notesService:NotesService,
    private _contextService:ContextService) { }

  ngOnInit(): void {

    if(localStorage.getItem("logged")=="true"){
      this.user.email = this._contextService.getEmail();
      this.user.password = this._contextService.getPass();
      this.getMyNotes
      this.getSharedNotes
    }
  }

  getMyNotes(){
    this._notesService.getMyNotes(this.user)
    .subscribe((notesData) => this.mynotes = notesData,                           
    (error) => {console.log(error);
      this.statusMessage = "Problem with service"
      });
  }

  getSharedNotes(){
    this._notesService.getSharedNotes(this.user)
    .subscribe((notesData) => this.sharednotes = notesData,                           
    (error) => {console.log(error);
      this.statusMessage = "Problem with service"
      });    
  }

  deleteNote(id: number){
    this._notesService.deleteNote(this.user, id)
    .subscribe((status) => this.statusMessage = status,                           
    (error) => {console.log(error);
      });
  }

  addNote(){
    
  }

  shareNote(){

  }

}
