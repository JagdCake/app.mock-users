import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

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

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

}
