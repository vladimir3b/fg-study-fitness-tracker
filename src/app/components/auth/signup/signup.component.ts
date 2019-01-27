import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from './../../../services/auth.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { AppReducer as fromRoot } from 'src/app/reducers/app.reducer';


@Component({
  selector: 'fg-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Properties
  public maximumDate: Date;
  public isLoading$: Observable<boolean>;

  // Class Constructor
  constructor(
      private _authService: AuthService,
      private _userInterfaceService: UserInterfaceService,
      private _store: Store<fromRoot.IState>
  ) {}

  // Life-cycle Hooks
  public ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.GET_IS_LOADING);
    this.maximumDate = new Date();
    this.maximumDate.setFullYear(this.maximumDate.getFullYear() - 18);
  }

  // Methods
  public onSubmit(form: NgForm): void {
    this._authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
