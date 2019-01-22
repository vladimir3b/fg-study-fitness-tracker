import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { IUserModel } from '../models/user.model';
import { IAuthDataModel } from './../models/auth-data.model';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Properties
  private _user: IUserModel;
  public get user(): IUserModel {
    return { ...this._user };
  }
  public authChange: Subject<boolean>;

  // The constructor
  constructor(private _router: Router) {
    this.authChange = new Subject();
  }

  // Methods
  private _authSuccessfully(token: boolean = true): void {
    this.authChange.next(token);
    this._router.navigate([token ? '/training' : '/login']);
  }

  public isAuth(): boolean {
    return this._user != null;
  }

  public registerUser(authData: IAuthDataModel): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000000).toString()
    };
    this._authSuccessfully();
  }

  public login(authData: IAuthDataModel): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000000).toString()
    };
    this._authSuccessfully();
  }

  public logout(): void {
    this._user = null;
    this._authSuccessfully(false);
  }

}
