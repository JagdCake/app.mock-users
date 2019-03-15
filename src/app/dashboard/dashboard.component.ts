import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

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

    getUsers(): void {
        this.userService.getUsers()
            .subscribe((users) => this.users = users);
    }

    deleteUser(): void {
        this.userService.deleteUser(this.userId)
            .subscribe((response) => console.log(response.body.message));

        this.userId = 'deleted';
    }

    confirmDelete(id: number, name: string) {
        this.userId = id;
        this.name = name;
    }

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

}
