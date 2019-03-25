import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

@Component({selector: 'app-messages', template: ''})
class MessagesStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AppComponent', () => {
    let componentLinks: HTMLElement[];
    let router: Router;
    let fixture;
    let app
    let elements;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ RouterTestingModule ],
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

    it('and the links should work', () => {
        const indexPage = componentLinks[0].getAttribute('href');
        const usersPage = componentLinks[1].getAttribute('href');
        const addUserPage = componentLinks[2].getAttribute('href');

        router = TestBed.get(Router);
        const spy = spyOn(router, 'navigateByUrl');

        router.navigateByUrl(indexPage);
        expect(spy).toHaveBeenCalledWith('/');

        router.navigateByUrl(usersPage);
        expect(spy).toHaveBeenCalledWith('/dashboard/users/1');

        router.navigateByUrl(addUserPage);
        expect(spy).toHaveBeenCalledWith('/dashboard/users/add');
    });
});
