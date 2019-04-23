import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }
    page: number;
    pages: number;
    itemsPerPage = 18;

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

}
