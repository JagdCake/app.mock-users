import { Component, OnInit, DoCheck } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { PaginationService } from '../pagination.service';

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
export class DashboardComponent implements OnInit, DoCheck {

    selectedUser: any; // : HTML element
    userId = null;
    name: string;


    getUsers(fromIndex: number, toIndex: number): void {
        this.userService.getUsers()
            .subscribe((users) => {
                const sliceOfUsers = users.slice(fromIndex, toIndex);

                this.paginationService.getNumOfPagesFor(sliceOfUsers);
                this.paginationService.redirectIfNothingOnPage();
            });
    }

    deleteUser(): void {
        this.userService.deleteUser(this.userId)
            .subscribe((response) => {
                if (response) {
                    console.log(response.body);
                    this.selectedUser.classList.add('invisible');
                }
                this.userId = null;
            });
    }

    confirmDelete(id: number, name: string, user: object): void {
        this.selectedUser = user;
        this.userId = id;
        this.name = name;
    }

    getUsersForPage() {
        this.page = +this.route.snapshot.paramMap.get('page');
        const pagination = this.paginate(this.page);
        this.getUsers(pagination.startIndex, pagination.lastIndex);
    }

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private paginationService: PaginationService
    ) { }

    ngOnInit(): void {
        this.getUsersForPage();
    }

    ngDoCheck(): void {
        const page = +this.route.snapshot.paramMap.get('page');
        if (page !== this.page) {
            this.getUsersForPage();
        }
    }

}
