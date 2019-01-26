interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false
};

function appReducer(state: IState = initialState, action): IState {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export {
  IState,
  appReducer
}
