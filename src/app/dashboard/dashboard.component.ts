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

    getUsers(): void {
        this.userService.getUsers()
            .subscribe((users) => this.users = users);
    }

    deleteUser(id: number): void {
        this.userService.deleteUser(id)
            .subscribe((response: ApiResponse) => console.log(response.message));
    }

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

}
