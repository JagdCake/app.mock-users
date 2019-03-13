import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from '../user.service';
import { ApiResponse } from '../api-response';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    user = new FormGroup({
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        age: new FormControl(''),
        sex: new FormControl(''),
    });

    add(): void {
        this.userService.addUser(this.user.value)
            .subscribe((response: ApiResponse) => console.log(response.message));
    }

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

}
