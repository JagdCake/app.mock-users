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
        first_name: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Z ]+'),
                Validators.maxLength((50))
            ]
        ],
        last_name: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Z ]+'),
                Validators.maxLength((50))
            ]
        ],
        age: [18, [
                Validators.required,
                Validators.min(0),
                Validators.max(120),
            ]
        ],
        sex: ['', [
                Validators.pattern('^(Male|Female)$')
            ]
        ],
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

    get firstName() {
        return this.userForm.get('first_name');
    }

    get lastName() {
        return this.userForm.get('last_name');
    }

    get age() {
        return this.userForm.get('age');
    }
}
