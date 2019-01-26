import { Action } from '@ngrx/store';

export namespace UserInterfaceActions {

  export const START_LOADING: string = '[UserInterface] Start Loading';
  export const STOP_LOADING: string = '[UserInterface] Stop Loading';

  export class StartLoading implements Action {
    public readonly type: string;
    constructor() {
      this.type = START_LOADING;
    }
  }

  export class StopLoading implements Action {
    public readonly type: string;
    constructor() {
      this.type = STOP_LOADING;
    }
  }

  export type actionsType = StartLoading | StopLoading;

}
