import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  // Class constructor
  constructor(
      private _router: Router,
      private _authService: AuthService
  ) { }

  // Methods
  public canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    if (this._authService.isAuth) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
