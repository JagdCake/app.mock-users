import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../user.service';
import { ApiResponse } from '../api-response';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    userForm = this.fb.group({
        first_name: [''],
        last_name: [''],
        age: [''],
        sex: [''],
    });

    add(): void {
        this.userService.addUser(this.userForm.value)
            .subscribe((response: ApiResponse) => console.log(response.message));
    }

    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
    }

}
