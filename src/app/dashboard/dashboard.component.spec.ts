import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { UserService } from '../user.service';

class MockUserService {
    users = [
        {
            id: 1,
            first_name: 'Ethelbert',
            last_name: 'Swinfon',
        },
    ];

    getUsers(): Observable<object[]> {
        return new Observable((observer) => {
            const handler = (users) => observer.next(users);

            handler(this.users);

            return handler;
        });
    }
}

describe('DashboardComponent', () => {
    let userService: UserService;
    let dashboard: DashboardComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            providers: [
                DashboardComponent,
                {
                    provide: UserService,
                    useClass: MockUserService,
                }
            ],
        }).compileComponents();

        dashboard = TestBed.get(DashboardComponent);
        userService = TestBed.get(UserService);
    }));

    it('should create the dashboard', () => {
        expect(dashboard).toBeTruthy();
    });

    describe('and its methods', () => {
        it('should generate the right indices to slice off 18 users from an array', () => {
            // arg1 = page number, arg2 = 18; users per page
            let usersIndices = dashboard.paginate(1);

            expect(usersIndices.startIndex).toEqual(0);
            expect(usersIndices.lastIndex).toEqual(18);

            usersIndices = dashboard.paginate(3);

            expect(usersIndices.startIndex).toEqual(36);
            expect(usersIndices.lastIndex).toEqual(54);
        });
    });
});
