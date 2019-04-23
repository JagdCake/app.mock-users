import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

    page: number;
    pages: number;
    itemsPerPage = 18;

    redirectIfNothingOnPage(page = this.page, pages = this.pages): void {
        if (page <= 0 || page > pages) {
            this.router.navigateByUrl('/');
            this.messageService.log('error', 'Page doesn\'t exist');
        }
    }

    paginate(page: number, itemsPerPage = this.itemsPerPage): any {
        const theLastIndex = page * itemsPerPage;

        if (page === 1) {
            return {
                startIndex: 0,
                lastIndex: theLastIndex,
            };
        }

        return {
            startIndex: (theLastIndex - itemsPerPage),
            lastIndex: theLastIndex,
        };
    }

    constructor(
        private router: Router,
        private messageService: MessagesService,
    ) { }
}
