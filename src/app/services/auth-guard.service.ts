import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Router,
  CanLoad,
  Route
} from '@angular/router';

import { AppReducer as fromRoot } from '../reducers/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  // Class constructor
  constructor(
      private _router: Router,
      private _store: Store<fromRoot.IState>
  ) { }

  // Methods
  public canLoad(route: Route): Observable<boolean> {
    const IS_AUTHENTICATED = this._store.select(fromRoot.GET_IS_AUTHENTICATED).pipe(take(1));
    IS_AUTHENTICATED.subscribe((result: boolean) => {
      if (!result) {
        this._router.navigate(['/']);
      }
    });
    return IS_AUTHENTICATED;
  }
}
