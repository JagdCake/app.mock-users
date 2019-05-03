import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
    let service: PaginationService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            providers: [ PaginationService ],
        });

        service = TestBed.get(PaginationService);
        router = TestBed.get(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should redirect if there is nothing on a page', () => {
        const navigationSpy = spyOn(router, 'navigateByUrl');

        // arg1 = current page number, arg2 = total number of pages
        service.redirectIfNothingOnPage(1, 1);
        expect(navigationSpy).not.toHaveBeenCalled();

        service.redirectIfNothingOnPage(0, 1);
        expect(navigationSpy).toHaveBeenCalledWith('/');

        service.redirectIfNothingOnPage(2, 1);
        expect(navigationSpy).toHaveBeenCalledWith('/');
    });

    it('should set the correct number of pages to fit all content', () => {
        service.setNumOfPagesFor(new Array(10000));
        expect(service.pages).toEqual(556);

        service.itemsPerPage = 5;

        service.setNumOfPagesFor(new Array(4));
        expect(service.pages).toEqual(1);

        service.setNumOfPagesFor(new Array(5));
        expect(service.pages).toEqual(1);

        service.setNumOfPagesFor(new Array(6));
        expect(service.pages).toEqual(2);
    });
});
