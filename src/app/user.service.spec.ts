import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from './user';

describe('UserService', () => {
    let service: UserService;
    let httpController: HttpTestingController;
    let userData: User[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [ UserService ],
        });

        service = TestBed.get(UserService);
        httpController = TestBed.get(HttpTestingController);

        userData = [
            {
                id: 1,
                first_name: 'test',
                last_name: 'test',
                age: 0,
                sex: 'test',
            },
            {
                id: 2,
                first_name: 'test',
                last_name: 'test',
                age: 0,
                sex: 'test',
            }
        ];
    });

    afterEach(() => {
        // make sure there are no pending requests
        httpController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all users from an API', () => {
        service.getUsers().subscribe((data) => {
            expect(data).toEqual(userData);
        });

        const httpTest = httpController.expectOne(
            req => req.headers.has('X-AUTH-TOKEN')
        );
        expect(httpTest.request.method).toEqual('GET');

        httpTest.flush(userData);
        expect(service.userFromDashboard).toEqual(true);
    });

    it('should get a specific user from an API', () => {
        service.getUser(1).subscribe((data) => {
            expect(data).toEqual(userData[0]);
        });

        const httpTest = httpController.expectOne(
            req => req.headers.has('X-AUTH-TOKEN')
        );
        expect(httpTest.request.method).toEqual('GET');
    });
});
