import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { IUserModel } from '../models/user.model';
import { IAuthDataModel } from './../models/auth-data.model';
import { TrainingService } from './training.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { IState } from '../reducers/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Properties
  private _isAuth: boolean;
  private _loggedUser: string;
  public get loggedUser(): string {
    return this._loggedUser;
  }
  public get isAuth(): boolean { // used in auth-guard service
    return this._isAuth;
  }
  public authChange: Subject<boolean>; // used in navigation subscript and header to toggle menu

  // The constructor
  constructor(
      private _router: Router,
      private _angularFireAuth: AngularFireAuth,
      private _trainingService: TrainingService,
      private _userInterfaceService: UserInterfaceService,
      private _store: Store<{ui: IState}>
  ) {
    this.authChange = new Subject();
    this._isAuth = false;
  }

  // Methods
  private _authSuccessfully(token: boolean = true): void {
    this._isAuth = token;
    this.authChange.next(token);
    this._router.navigate([token ? '/training' : '/']);
  }

  public initAuthListener(): void {
    this._angularFireAuth.authState.subscribe((user: any) => {
      this._loggedUser = (user) ? user.email : '';
      this._authSuccessfully(user != null);
      if (!user) {
        this._trainingService.cancelSubscriptions();
      }
    });
  }

  public registerUser(authData: IAuthDataModel): void {
    // this._userInterfaceService.registeringProgress.next(true); // register process has started
    this._store.dispatch({
      type: 'START_LOADING'
    });
    this._angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this._userInterfaceService.registeringProgress.next(false); // register process has successfully terminated
        this._store.dispatch({
          type: 'STOP_LOADING'
        });
      })
      .catch((error) => {
        // this._userInterfaceService.registeringProgress.next(false); // register process has terminated with an error
        this._store.dispatch({
          type: 'STOP_LOADING'
        });
        this._userInterfaceService.showSnackBarMessages(error.message, null, 5000);
      });
  }

  public login(authData: IAuthDataModel): void {
    // this._userInterfaceService.loggingInProgress.next(true); // login process has started
    this._store.dispatch({
      type: 'START_LOADING'
    });
    this._angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this._userInterfaceService.loggingInProgress.next(false); // login process has successfully terminated
        this._store.dispatch({
          type: 'STOP_LOADING'
        });
      })
      .catch((error) => {
        // this._userInterfaceService.loggingInProgress.next(false); // login process has terminated with an error
        this._store.dispatch({
          type: 'STOP_LOADING'
        });
        this._userInterfaceService.showSnackBarMessages(error.message, null, 5000);
      });
  }

  public logout(): void {
    this._angularFireAuth.auth.signOut();
  }

}
