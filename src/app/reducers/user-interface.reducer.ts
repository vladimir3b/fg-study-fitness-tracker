import { UserInterfaceActions } from './user-interface.actions';

export namespace UserInterfaceReducer {

  export interface IState {
    isLoading: boolean;
  }

  const INITIAL_STATE: IState = {
    isLoading: false
  };

  export function reducer(state: IState = INITIAL_STATE, action: UserInterfaceActions.actionsType): IState {
    switch (action.type) {
      case UserInterfaceActions.START_LOADING:
        return {
          isLoading: true
        };
      case UserInterfaceActions.STOP_LOADING:
        return {
          isLoading: false
        };
      default:
        return state;
    }
  }

  export const GET_IS_LOADING = (state: IState) => state.isLoading;

}

