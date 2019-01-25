import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from './../../../services/auth.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'fg-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Subscription;
  public maximumDate: Date;
  public isLoading: boolean;

  // Class Constructor
  constructor(
      private _authService: AuthService,
      private _userInterfaceService: UserInterfaceService
  ) {
    this.isLoading = false;
  }
  // Life-cycle Hooks
  public ngOnInit(): void {
    this._subscription = this._userInterfaceService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.maximumDate = new Date();
    this.maximumDate.setFullYear(this.maximumDate.getFullYear() - 18);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  // Methods
  public onSubmit(form: NgForm): void {
    this._authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
