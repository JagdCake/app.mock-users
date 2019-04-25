import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';
import { UserService } from '../user.service';

class MockUserService {
    users = [
        {
            id: 1,
            first_name: 'Ethelbert',
            last_name: 'Swinfon',
            age: 30,
            sex: 'Male',
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
    let fixture: any;
    let app: any;
    let elements: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [ DashboardComponent] ,
            providers: [
                DashboardComponent,
                {
                    provide: UserService,
                    useClass: MockUserService,
                }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        app = fixture.debugElement.componentInstance;
        elements = fixture.debugElement.nativeElement;
        userService = TestBed.get(UserService);
    }));

    it('should create the dashboard', () => {
        expect(app).toBeTruthy();
    });

    it('should display a confirmation dialog to delete a user', () => {
        let dialog = elements.querySelector('.confirmation-dialog');
        expect(dialog).toBeNull();

        const fakeUser = {
            id: 1,
            name: 'Fake User',
        };
        app.confirmDelete(fakeUser.id, fakeUser.name, fakeUser);
        fixture.detectChanges();

        dialog = elements.querySelector('.confirmation-dialog');
        expect(dialog.hasAttribute('hidden')).toEqual(false);
    });
});
