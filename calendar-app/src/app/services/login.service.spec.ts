import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import { LoginService } from './login.service';
import { EndpointsService } from '../endpoints/endpoints.service';
import { User } from '../models/user.model';

// Tests endpoints in loginService. Not functional due to database being different on local machines but the structure is there.
// Can be easily modified to work



describe('LoginService', () => {

    let httpTestingController: HttpTestingController;
    let endPoints: EndpointsService;
    let loginService: LoginService;
    let user: User;

    beforeEach(() => {
        TestBed.configureTestingModule({           
            imports: [HttpClientTestingModule]
        });
        loginService = TestBed.inject(LoginService);

        httpTestingController = TestBed.get(HttpTestingController);
        user = {
            email: "as@gmail.com",
            password: "password1",
            name: "ashoka",
            token: "sometoken"
        };
    });

    beforeEach(inject(
        [LoginService],
        (service: LoginService) => {
            loginService = service;
        }
    ));

    it("should return user object", () => {

        let result: User;

        loginService.loginAuthentication(user).subscribe(users => {
            result = users;
        });
        const req = httpTestingController.expectOne({
            method: "POST",
            url: endPoints.LOGIN_USER
        });

        req.flush([user]);
        expect(result).toEqual(user);

    })

    
    it("should return registered user object", () => {

        let result: User;

        loginService.register(user).subscribe(users => {
            result = users;
        });
        const req = httpTestingController.expectOne({
            method: "POST",
            url: endPoints.REGISTER_USER
        });

        req.flush([user]);
        expect(result).toEqual(user);

    })


});
