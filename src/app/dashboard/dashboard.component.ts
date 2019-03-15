import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';
import { ApiResponse } from '../api-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
            .subscribe((response: ApiResponse) => console.log(response.message));

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
