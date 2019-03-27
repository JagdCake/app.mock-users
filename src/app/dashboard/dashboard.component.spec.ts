import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

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
    let fixture: ComponentFixture<DashboardComponent>;
    let dashboard: DashboardComponent;
    let elements;
    let debugElements;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ DashboardComponent ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        dashboard = fixture.componentInstance;
        elements = fixture.nativeElement;
        debugElements = fixture.debugElement;
    }));

    it('should create the dashboard', () => {
        expect(dashboard).toBeTruthy();
    });
});
