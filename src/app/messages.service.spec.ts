import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MessagesService = TestBed.get(MessagesService);
        expect(service).toBeTruthy();
    });

    it('should throw an error if a message type is unsupported', () => {
        const service: MessagesService = TestBed.get(MessagesService);

        console.error = jasmine.createSpy('error');
        service.log('', 'message');
        expect(console.error).toHaveBeenCalledWith('Unsupported message type');
    });
});
