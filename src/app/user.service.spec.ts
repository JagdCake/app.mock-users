import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [ UserService ],
        });

        service = TestBed.get(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
