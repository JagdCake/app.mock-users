import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    formButton = 'Add';
    isEditRoute: boolean;
    userId: number;

    userForm = this.fb.group({
        first_name: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Z ]+'),
                Validators.maxLength((20))
            ]
        ],
        last_name: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Z ]+'),
                Validators.maxLength((20))
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

    goBack(): void {
        if (this.userService.userFromDashboard) {
            this.location.back();
        } else {
            this.router.navigateByUrl('/');
        }
    }

    show(): void {
        this.userService.getUser(this.userId)
            .subscribe((user) => this.userForm.setValue(user));
    }

    add(): void {
        this.userService.addUser(this.userForm.value)
            .subscribe((response) => {
                if (response) {
                    console.log(response.body);
                    this.userForm.reset();
                }
            });
    }

    edit(): void {
        this.userService.editUser(this.userId, this.userForm.value)
            .subscribe((response) => {
                if (response) {
                    console.log(response.body);
                    this.goBack();
                }
            });
    }

    addOrEdit(): void {
        if (this.userForm.invalid) {
            return;
        }

        if (this.isEditRoute) {
            this.edit();
        } else {
            this.add();
        }
    }

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isEditRoute = this.route.snapshot.paramMap.has('id');

        if (this.isEditRoute) {
            this.userId = +this.route.snapshot.paramMap.get('id');
            this.show();
            this.formButton = 'Edit';
        }
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
