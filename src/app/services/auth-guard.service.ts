import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  Route
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  // Class constructor
  constructor(
      private _router: Router,
      private _authService: AuthService
  ) { }

  // Methods
  public canLoad(route: Route): boolean {
    if (this._authService.isAuth) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }
}
