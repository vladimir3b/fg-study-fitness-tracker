import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


import { IUserModel } from '../models/user.model';
import { IAuthDataModel } from './../models/auth-data.model';
import { TrainingService } from './training.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Properties
  private _isAuth: boolean;
  public get isAuth(): boolean { // used in auth-guard service
    return this._isAuth;
  }
  public authChange: Subject<boolean>; // used in navigation subscript and header to toggle menu

  // The constructor
  constructor(
      private _router: Router,
      private _angularFireAuth: AngularFireAuth,
      private _trainingService: TrainingService
  ) {
    this.authChange = new Subject();
    this._isAuth = false;
  }

  // Methods
  private _authSuccessfully(token: boolean = true): void {
    this._isAuth = token;
    this.authChange.next(token);
    this._router.navigate([token ? '/training' : '/login']);
  }

  public initAuthListener(): void {
    this._angularFireAuth.authState.subscribe((user: any) => {
      this._authSuccessfully(user != null);
      if (!user) {
        this._trainingService.cancelSubscriptions();
      }
    });
  }

  public registerUser(authData: IAuthDataModel): void {
    this._angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .catch((error) => {
        console.error(error);
      });
  }

  public login(authData: IAuthDataModel): void {
    this._angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .catch((error) => {
        console.error(error);
      });
  }

  public logout(): void {
    this._angularFireAuth.auth.signOut();
  }

}
