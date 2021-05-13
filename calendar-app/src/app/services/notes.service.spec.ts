import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import { NotesService } from './notes.service';
import { EndpointsService } from '../endpoints/endpoints.service';
import { User } from '../models/user.model'
import { Notes } from '../models/notes.model'

// Tests endpoints in notesService. Not functional due to database being different on local machines but the structure is there.
// Can be easily modified to work



describe('NotesService', () => {

    let httpTestingController: HttpTestingController;
    let endPoints: EndpointsService;
    let notesService: NotesService;
    let note: Notes;
    let user: User;

    beforeEach(() => {
        TestBed.configureTestingModule({           
            imports: [HttpClientTestingModule]
        });
        notesService = TestBed.inject(NotesService);

        httpTestingController = TestBed.get(HttpTestingController);
        user = {
            email: "as@gmail.com",
            password: "password1",
            name: "ashoka",
            token: "sometoken"
        };
        note = {
            id: 1,
            owner: 1,
            contents: "Hello",
            date: "01-01-2021"

        }
    });

    beforeEach(inject(
        [NotesService],
        (service: NotesService) => {
        notesService = service;
        }
    ));

    it("should return list of notes", () => {

        let result: Notes[];

        notesService.getMyNotes(user).subscribe(notes => {
            result = notes;
        });
        const req = httpTestingController.expectOne({
            method: "GET",
            url: endPoints.GET_MNOTES
        });

        req.flush([user]);
        req.flush([note]);
        expect(result[0]).toEqual(note);

    })

    
    it("should return list of shared notes", () => {

        let result: Notes[];

        notesService.getSharedNotes(user).subscribe(notes => {
            result = notes;
        });
        const req = httpTestingController.expectOne({
            method: "POST",
            url: endPoints.GET_SNOTES
        });

        req.flush([user]);
        req.flush([note]);
        expect(result[0]).toEqual(note);

    })

    
    it("should return httpstatus 200", () => {

        notesService.deleteNote(user, note.id).subscribe();
        const req = httpTestingController.expectOne({
            method: "POST",
            url: endPoints.DELETE_NOTE
        });

        expect(req.request.body).toEqual(note);

    })

    it("should return added note", () => {

        let result: Notes;

        notesService.addNote(user, note).subscribe(notes => {
            result = notes;
        });
        const req = httpTestingController.expectOne({
            method: "POST",
            url: endPoints.ADD_NOTE
        });

        req.flush([user]);
        req.flush([note]);
        expect(result).toEqual(note);

    })

    it("should return shared note", () => {

        let result: Notes;

        notesService.shareNote(user, note.id, "avs@gmail.com").subscribe(notes => {
            result = notes;
        });
        const req = httpTestingController.expectOne({
            method: "POST",
            url: endPoints.SHARE_NOTE
        });

        req.flush([user]);
        req.flush([note]);
        expect(result).toEqual(note);

    })


});
