// Adding angular elements
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'fg-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Properties
  public maximumDate: Date;

  // Class Constructor
  constructor() { }

  // Life Cycles Hooks
  public ngOnInit(): void {
    this.maximumDate = new Date();
    this.maximumDate.setFullYear(this.maximumDate.getFullYear() - 18);
  }

  // Methods
  public onSubmit(form: NgForm): void {
    console.log(form);
  }

}
