import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'fg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Subscription;
  public loginForm: FormGroup;
  public isLoading: boolean;

  // Class Constructor
  constructor(
      private _authService: AuthService,
      private _userInterfaceService: UserInterfaceService
  ) {
    this.isLoading = false;
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this._subscription = this._userInterfaceService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, Validators.required)
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  // Methods
  public onSubmit(): void {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
