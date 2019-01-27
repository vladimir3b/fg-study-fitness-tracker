import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserInterfaceService } from './user-interface.service';
import { IExerciseModel } from '../models/exercise.model';
import { TrainingReducer as fromTraining } from '../reducers/training.reducer';
import { UserInterfaceActions as UserInterface} from '../reducers/user-interface.actions';
import { TrainingActions as Training } from '../reducers/training.actions';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // Properties
  private _subscriptions: Array<Subscription>;

  // Class constructor
  constructor(
      private _database: AngularFirestore,
      private _userInterfaceService: UserInterfaceService,
      private _store: Store<fromTraining.IState>
  ) {
    this._subscriptions = [];
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
    this._store.dispatch(new UserInterface.StartLoading());
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
          this._store.dispatch(new UserInterface.StopLoading());
          this._store.dispatch(new Training.SetAvailableTrainings(exercises));
        },
        (error) => {
          this._store.dispatch(new UserInterface.StopLoading());
          this._userInterfaceService.showSnackBarMessages(error.message, null, 5000);
        }
      ));
  }

  public fetchPastExercises(): void {
    this._store.dispatch(new UserInterface.StartLoading());
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
          this._store.dispatch(new UserInterface.StopLoading());
          this._store.dispatch(new Training.SetFinishedTrainings(exercises));
        },
        (error) => {
          this._store.dispatch(new UserInterface.StopLoading());
          this._userInterfaceService.showSnackBarMessages(error.message, null, 5000);
        }
      ));
  }

  public startExercise(selectedId: string): void {
    this._store.dispatch(new Training.StartTraining(selectedId));
  }

  public terminateExercise(progress: number): void {
    this._store.select(fromTraining.GET_ACTIVE_TRAINING)
      .pipe(take(1))
      .subscribe((exercise: IExerciseModel) => {
        this._addFinishedExerciseToDataBase({
          ...exercise,
          date: new Date(),
          state: (progress === 100) ? 'completed' : 'cancelled',
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100)
        });
        this._store.dispatch(new Training.StopTraining());
      });
  }

  public cancelSubscriptions(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
