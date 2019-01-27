import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { UserInterfaceReducer as fromUserInterface } from './user-interface.reducer';
import { AuthReducer as fromAuth } from './auth.reducer';


export namespace AppReducer {

  export interface IState {
    userInterface: fromUserInterface.IState;
    auth: fromAuth.IState;
  }

  export const REDUCERS: ActionReducerMap<IState> = {
    userInterface: fromUserInterface.reducer,
    auth: fromAuth.reducer
  };

  const GET_USER_INTERFACE_STATE = createFeatureSelector<fromUserInterface.IState>('userInterface');
  export const GET_IS_LOADING = createSelector(GET_USER_INTERFACE_STATE, fromUserInterface.GET_IS_LOADING);

  const GET_AUTH_STATE = createFeatureSelector<fromAuth.IState>('auth');
  export const GET_IS_AUTHENTICATED = createSelector(GET_AUTH_STATE, fromAuth.GET_IS_AUTHENTICATED);

}
