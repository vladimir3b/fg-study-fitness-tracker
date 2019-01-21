import { Injectable } from '@angular/core';
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
  constructor() {
    this.authChange = new Subject();
  }

  // Methods
  public registerUser(authData: IAuthDataModel): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000000).toString()
    };
    this.authChange.next(true);
  }

  public login(authData: IAuthDataModel): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000000).toString()
    };
    this.authChange.next(true);
  }

  public logout(): void {
    this._user = null;
    this.authChange.next(false);
  }

  public isAuth(): boolean {
    return this._user != null;
  }

}
