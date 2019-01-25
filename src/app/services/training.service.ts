import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


import { IExerciseModel } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // Properties
  private _availableExercises: Array<IExerciseModel>;
  private _currentExercise: IExerciseModel;
  private _subscriptions: Array<Subscription>;
  public changedExercise: Subject<IExerciseModel>;
  public getAvailableExercises: Subject<void>;
  public getPastExercises: Subject<Array<IExerciseModel>>;
  public get availableExercises(): Array<IExerciseModel> {
    return [ ...this._availableExercises ];
  }
  public get currentExercise(): IExerciseModel {
    return (this._currentExercise) ? { ...this._currentExercise } : null;
  }

  // Class constructor
  constructor(private _database: AngularFirestore) {
    this._subscriptions = [];
    this.changedExercise = new Subject();
    this.getAvailableExercises = new Subject();
    this.getPastExercises = new Subject();
  }

  // Methods
  private _addFinishedExerciseToDataBase(exercise: IExerciseModel): void {
    this._database.collection('pastExercises')
      .add(exercise)
      .catch((error) => {
        console.error(error);

      });
  }

  public fetchAvailableExercises(): void {
    this._subscriptions.push(this._database
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map((documents: Array<any>) => {
        return documents.map((document: any) => {
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data()
          };
        });
      }))
      .subscribe(
        (exercises: Array<IExerciseModel>) => {
          this._availableExercises = exercises;
          this.getAvailableExercises.next();
        },
        (error) => {
          console.error(error);
        }
      ));
  }

  public fetchPastExercises(): void {
    this._subscriptions.push(this._database
      .collection('pastExercises')
      .valueChanges()
      .pipe(map((documents: Array<any>) => {
        return documents.map((document: any) => {
          return {
            ...document,
            date: document.date.toDate()
          };
        });
      }))
      .subscribe(
        (exercises: Array<IExerciseModel>) => {
          this.getPastExercises.next(exercises);
        },
        (error) => {
          console.error(error);
        }
      ));
  }

  public startExercise(selectedId: string): void {
    this._currentExercise = this._availableExercises
      .find((exercise: IExerciseModel) => exercise.id === selectedId)
    this.changedExercise.next(this.currentExercise);
  }

  public terminateExercise(progress: number): void {
    this._addFinishedExerciseToDataBase({
      ...this.currentExercise,
      date: new Date(),
      state: (progress === 100) ? 'completed' : 'cancelled',
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100)
    });
    this._currentExercise = null;
    this.changedExercise.next(this.currentExercise);
  }

  public cancelSubscriptions(): void {
    this._subscriptions.forEach( (subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
