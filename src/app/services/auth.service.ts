import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { IAuthDataModel } from './../models/auth-data.model';
import { TrainingService } from './training.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { AppReducer as fromRoot } from '../reducers/app.reducer';
import { UserInterfaceActions as UserInterface} from '../reducers/user-interface.actions';


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
      private _store: Store<fromRoot.IState>
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
      

      this._store.dispatch((user) ? new Auth.SetAuthenticated() : new Auth.SetUnauthenticated);
      if (!user) {
        this._trainingService.cancelSubscriptions();
      }
    });
  }

  public registerUser(authData: IAuthDataModel): void {
    this._store.dispatch(new UserInterface.StartLoading());
    this._angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this._store.dispatch(new UserInterface.StopLoading());
      })
      .catch((error) => {
        this._store.dispatch(new UserInterface.StopLoading());
        this._userInterfaceService.showSnackBarMessages(error.message, null, 5000);
      });
  }

  public login(authData: IAuthDataModel): void {
    this._store.dispatch(new UserInterface.StartLoading());
    this._angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this._store.dispatch(new UserInterface.StopLoading());
      })
      .catch((error) => {
        this._store.dispatch(new UserInterface.StopLoading());
        this._userInterfaceService.showSnackBarMessages(error.message, null, 5000);
      });
  }

  public logout(): void {
    this._angularFireAuth.auth.signOut();
  }

}
