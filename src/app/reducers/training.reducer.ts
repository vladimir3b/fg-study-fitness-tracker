
import { AppReducer as fromRoot } from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TrainingActions } from './training.actions';
import { IExerciseModel } from '../models/exercise.model';

export namespace TrainingReducer {

  export interface ITrainingState {
    availableExercises: Array<IExerciseModel>;
    finishedExercises: Array<IExerciseModel>;
    activeTraining: IExerciseModel;
  }

  export interface IState extends fromRoot.IState {
    training: ITrainingState;
  }

  const INITIAL_STATE: ITrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
  };


  export function reducer(state: ITrainingState = INITIAL_STATE, action: TrainingActions.actionsType): ITrainingState {
    switch (action.type) {
      case TrainingActions.SET_AVAILABLE_TRAININGS:
        return {
          ...state,
          availableExercises: (<any>action).payload
        };
      case TrainingActions.SET_FINISHED_TRAININGS:
        return {
          ...state,
          finishedExercises: (<any>action).payload
        };
      case TrainingActions.START_TRAINING:
        return {
          ...state,
          activeTraining: {
            ...state.availableExercises.find((exercise: IExerciseModel) => exercise.id === (<any>action).payload)
          }
        };
      case TrainingActions.STOP_TRAINING:
        return {
          ...state,
          activeTraining: null
        };
      default:
        return state;
    }
  }


  export const GET_TRAINING_STATE = createFeatureSelector<ITrainingState>('training');

  export const GET_AVAILABLE_TRAININGS = createSelector(
    GET_TRAINING_STATE,
    (state: ITrainingState) => state.availableExercises
  );

  export const GET_FINISHED_TRAININGS = createSelector(
    GET_TRAINING_STATE,
    (state: ITrainingState) => state.finishedExercises
  );

  export const GET_ACTIVE_TRAINING = createSelector(
    GET_TRAINING_STATE,
    (state: ITrainingState) => state.activeTraining
  );

  export const GET_IS_TRAINING = createSelector(
    GET_TRAINING_STATE,
    (state: ITrainingState) => state.activeTraining != null
  );

}
