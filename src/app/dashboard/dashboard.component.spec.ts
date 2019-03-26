import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';

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
