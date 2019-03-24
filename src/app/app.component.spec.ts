import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({selector: 'app-messages', template: ''})
class MessagesStubComponent {}

describe('AppComponent', () => {
    let componentLinks: HTMLElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule
          ],
          declarations: [
            AppComponent,
            MessagesStubComponent,
          ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'M-P'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('M-P');
    });

    it('should render title in a h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toEqual('M-P');
    });

    it('should have exactly 3 links', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        componentLinks = compiled.querySelectorAll('a');
        expect(componentLinks.length).toEqual(3);
    });

});
