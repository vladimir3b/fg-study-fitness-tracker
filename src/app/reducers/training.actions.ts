import { Action } from '@ngrx/store';
import { IExerciseModel } from '../models/exercise.model';

export namespace TrainingActions {

  export const SET_AVAILABLE_TRAININGS: string = '[Training] Set Available Trainings';
  export const SET_FINISHED_TRAININGS: string = '[Training] Set Finished Trainings';
  export const START_TRAINING: string = '[Training] Start Training';
  export const STOP_TRAINING: string = '[Training] Stop Training';

  export class SetAvailableTrainings implements Action {
    public readonly type: string;
    constructor(public payload: Array<IExerciseModel>) {
      this.type = SET_AVAILABLE_TRAININGS;
    }
  }

  export class SetFinishedTrainings implements Action {
    public readonly type: string;
    constructor(public payload: Array<IExerciseModel>) {
      this.type = SET_FINISHED_TRAININGS;
    }
  }

  export class StartTraining implements Action {
    public readonly type: string;
    constructor(public payload: string) {
      this.type = START_TRAINING;
    }
  }
  export class StopTraining implements Action {
    public readonly type: string;
    constructor() {
      this.type = STOP_TRAINING;
    }
  }

  export type actionsType = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;

}
