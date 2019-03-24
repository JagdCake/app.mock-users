import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({selector: 'app-messages', template: ''})
class MessagesStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AppComponent', () => {
    let componentLinks: HTMLElement[];
    let fixture;
    let app
    let elements;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            AppComponent,
            MessagesStubComponent,
            RouterOutletStubComponent,
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        elements = fixture.debugElement.nativeElement;
    }));

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it(`should have as title 'M-P'`, () => {
        expect(app.title).toEqual('M-P');
    });

    it('should render title in a h1 tag', () => {
        fixture.detectChanges();

        const h1Tag = elements.querySelector('h1').textContent;
        expect(h1Tag).toEqual('M-P');
    });

    it('should have exactly 3 links', () => {
        fixture.detectChanges();
        componentLinks = elements.querySelectorAll('a');
        expect(componentLinks.length).toEqual(3);
    });

});
