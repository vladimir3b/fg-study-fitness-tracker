// Adding angular elements
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Properties
  public loginForm: FormGroup;

  // Class Constructor
  constructor() { }

  // Life-cycle hooks
  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, Validators.required)
    });
  }

  // Methods
  public onSubmit(): void {
    console.log(this.loginForm);
  }
}
