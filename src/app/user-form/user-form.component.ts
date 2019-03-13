import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
