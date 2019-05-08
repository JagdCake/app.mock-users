import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessagesService } from '../messages.service';

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;
    let elements: any;
    let service: MessagesService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ MessagesComponent ],
            providers: [ MessagesService ],
        })
        .compileComponents();

        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        elements = fixture.debugElement.nativeElement;
        service = TestBed.get(MessagesService);
    }));

    it('should create the messages component', () => {
        expect(component).toBeTruthy();
    });


    it('should display error messages', () => {
        service.log('error', 'Something happened');
        fixture.detectChanges();

        const successMessage = elements.querySelector('.error-message').textContent;
        expect(successMessage).toContain('Something happened');
    });
});
