import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { UserInterfaceReducer as fromUserInterface } from './user-interface.reducer';


export namespace AppReducer {

  export interface IState {
    userInterface: fromUserInterface.IState;
  }

  export const REDUCERS: ActionReducerMap<IState> = {
    userInterface: fromUserInterface.reducer
  };

  export const USER_INTERFACE_STATE = createFeatureSelector<fromUserInterface.IState>('userInterface');
  export const GET_IS_LOADING = createSelector(USER_INTERFACE_STATE, fromUserInterface.GET_IS_LOADING);

}
