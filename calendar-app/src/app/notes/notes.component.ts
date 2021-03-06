import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '../services/context.service';
import { Notes } from '../models/notes.model';
import { NotesService } from 'src/app/services/notes.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  user = new User();
  note = new Notes();
  mynotes:Notes[]
  sharednotes:Notes[]
  statusMessage:string

  allShared: string[];
  share: string;

  deletedNote = new Notes();



  constructor(private router:Router,
    private _notesService:NotesService,
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem("logged")=="true"){
      console.log(this.note.contents)
      this.user.email = this._contextService.getEmail();
      this.user.password = this._contextService.getPass();
      this.user.token = this._contextService.getToken();
      this.getMyNotes();
      this.getSharedNotes();
    }
  }

  getMyNotes(){
    this._notesService.getMyNotes(this.user)
    .subscribe((notesData) => {this.mynotes = notesData, console.log(this.mynotes)},                           
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

    console.log(id)

    this._notesService.deleteNote(this.user, id)
    .subscribe((status) => this.statusMessage = status,                           
    (error) => {console.log(error);
      });
  }

  addNote(){
    this._notesService.addNote(this.user, this.note)
    .subscribe((status) => {this.statusMessage = status, this.toastr.success("Note created"), location.reload()},                           
    (error) => {console.log(error);
      });
  }

  shareNote(id: number){
    this._notesService.shareNote(this.user, id, this.share)
    .subscribe((status) => this.statusMessage = status,                           
    (error) => {console.log(error);
      });
  }

}
