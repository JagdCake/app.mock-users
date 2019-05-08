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

    function getMessage(msgType: string): string {
        service.log(msgType, 'Message');
        fixture.detectChanges();

        return elements.querySelector(`.${msgType}-message`).textContent;
    }

    it('should display error messages', () => {
        expect(getMessage('error')).toContain('Message');
    });

    it('should display success messages', () => {
        expect(getMessage('success')).toContain('Message');
    });
});
