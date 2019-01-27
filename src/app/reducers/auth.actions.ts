import { Action } from '@ngrx/store';

export namespace AuthActions {

  export const SET_AUTHENTICATED: string = '[Auth] Set Authenticated';
  export const SET_UNAUTHENTICATED: string = '[Auth] Set Unauthenticated';

  export class SetAuthenticated implements Action {
    public readonly type: string;
    constructor() {
      this.type = SET_AUTHENTICATED;
    }
  }

  export class SetUnauthenticated implements Action {
    public readonly type: string;
    constructor() {
      this.type = SET_UNAUTHENTICATED;
    }
  }

  export type actionsType = SetAuthenticated | SetUnauthenticated;

}
