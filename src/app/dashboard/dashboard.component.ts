import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    animations: [
        trigger(
            'dialogAnim', [
                transition(':enter', [
                    style({
                        transform: 'translateX(-100%)',
                        opacity: 0,
                    }),
                    animate('100ms', style({
                        transform: 'translateX(0)',
                        opacity: 1,
                    }))
                ]),
                transition(':leave', [
                    style({
                        transform: 'translateX(0)',
                        opacity: 1,
                    }),
                    animate('100ms', style({
                        transform: 'translateX(-100%)',
                        opacity: 0,
                    }))
                ])
            ]
        )
    ],
})
export class DashboardComponent implements OnInit {

    users: User[] = [];
    userId = null;
    name: string;

    itemsPerPage = 18;
    page: number;
    pages: number;

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

    goBackIfNoUsers(): void {
        if (this.page <= 0 || this.page > this.pages) {
            this.location.back();
        }
    }

    getUsers(fromIndex: number, toIndex: number): void {
        this.userService.getUsers()
            .subscribe((users) => {
                this.users = users.slice(fromIndex, toIndex);

                this.pages = Math.round(users.length / this.itemsPerPage);
                this.goBackIfNoUsers();
            });
    }

    deleteUser(): void {
        this.userService.deleteUser(this.userId)
            .subscribe((response) => console.log(response.body));

        this.userId = 'deleted';
    }

    confirmDelete(id: number, name: string) {
        this.userId = id;
        this.name = name;
    }

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        this.page = +this.route.snapshot.paramMap.get('page');
        const pagination = this.paginate(this.page);
        this.getUsers(pagination.startIndex, pagination.lastIndex);
    }

}
