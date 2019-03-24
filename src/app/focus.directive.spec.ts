import { FocusDirective } from './focus.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('FocusDirective', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            HttpClientModule,
          ],
          declarations: [
            DashboardComponent,
            FocusDirective,
          ],
        }).compileComponents();
    }));

    it('should create an instance', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const dashboard = fixture.debugElement.componentInstance;
        const elementToFocusOn = dashboard.noBtn;

        const directive = new FocusDirective(elementToFocusOn);
        expect(directive).toBeTruthy();
    });
});
