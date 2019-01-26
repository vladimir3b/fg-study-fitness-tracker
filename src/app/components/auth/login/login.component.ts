import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { IState } from 'src/app/reducers/app.reducer';

@Component({
  selector: 'fg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Properties
  private _subscription: Subscription;
  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;

  // Class Constructor
  constructor(
      private _authService: AuthService,
      private _userInterfaceService: UserInterfaceService,
      private _store: Store<{ui: IState}>
  ) {}

  // Life-cycle hooks
  public ngOnInit(): void {
    this.isLoading$ = this._store.pipe(map(state => state.ui.isLoading));
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
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
