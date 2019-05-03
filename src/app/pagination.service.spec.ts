import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
    }));

    it('should be created', () => {
        const service: PaginationService = TestBed.get(PaginationService);
        expect(service).toBeTruthy();
    });
});
