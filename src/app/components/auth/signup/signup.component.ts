import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../../../services/auth.service';


@Component({
  selector: 'fg-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Properties
  public maximumDate: Date;

  // Class Constructor
  constructor(private authService: AuthService) { }

  // Life-cycle Hooks
  public ngOnInit(): void {
    this.maximumDate = new Date();
    this.maximumDate.setFullYear(this.maximumDate.getFullYear() - 18);
  }

  // Methods
  public onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
