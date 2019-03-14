import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { ApiResponse } from '../api-response';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    userForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
        last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
        age: [''],
        sex: [''],
    });

    add(): void {
        if (this.userForm.invalid) {
            return;
        }

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
