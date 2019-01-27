import { AuthActions } from './auth.actions';


export namespace AuthReducer {

  export interface IState {
    isAuthenticated: boolean;
  }

  const INITIAL_STATE: IState = {
    isAuthenticated: false

  };

  export function reducer(state: IState = INITIAL_STATE, action: AuthActions.actionsType): IState {
    switch (action.type) {
      case AuthActions.SET_AUTHENTICATED:
        return {
          isAuthenticated: true
        };
      case AuthActions.SET_UNAUTHENTICATED:
        return {
          isAuthenticated: false
        };
      default:
        return state;
    }
  }

  export const GET_IS_AUTHENTICATED = (state: IState) => state.isAuthenticated;

}
