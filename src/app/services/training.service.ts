import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IExerciseModel } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // Properties
  private _availableExercises: Array<IExerciseModel>;
  private _currentExercise: IExerciseModel;
  private _pastExercises: Array<IExerciseModel>;
  public changedExercise: Subject<IExerciseModel>;
  public get availableExercises(): Array<IExerciseModel> {
    return [ ...this._availableExercises ];
  }
  public get currentExercise(): IExerciseModel {
    return (this._currentExercise) ? { ...this._currentExercise } : null;
  }

  // Class constructor
  constructor() {
    this._availableExercises = [
      {
        id: 'crunches',
        name: 'Crunches',
        duration: 30,
        calories: 8
      },
      {
        id: 'touch-toes',
        name: 'Touch Toes',
        duration: 180,
        calories: 18
      },
      {
        id: 'side-lunges',
        name: 'Side Lunges',
        duration: 120,
        calories: 12
      },
      {
        id: 'burpees',
        name: 'Burpees',
        duration: 60,
        calories: 8
      },
      {
        id: 'pushups',
        name: 'Pushups',
        duration: 45,
        calories: 20
      },
    ];
    this._pastExercises = [];
    this.changedExercise = new Subject();
  }

  // Methods
  public startExercise(selectedId: string): void {
    this._currentExercise = this._availableExercises
      .find((exercise: IExerciseModel) => exercise.id === selectedId)
    this.changedExercise.next(this.currentExercise);
  }

  public terminateExercise(progress: number): void {
    this._pastExercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: (progress === 100) ? 'completed' : 'cancelled',
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100)
    });
    this._currentExercise = null;
    this.changedExercise.next(this.currentExercise);
    console.log(this._pastExercises);
  }

}
