import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from './../../../services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { AppReducer as fromRoot } from 'src/app/reducers/app.reducer';

@Component({
  selector: 'fg-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // Properties
  private _subscriptions: Array<Subscription>;
  public isLoading$: Observable<boolean>;
  public exercises: Array<IExerciseModel>;

  // Class Constructor
  constructor(
      private _trainingService: TrainingService,
      private _userInterfaceService: UserInterfaceService,
      private _store: Store<fromRoot.IState>
  ) {
    this._subscriptions = [];
  }

  // Life-cycle hooks
  public ngOnInit(): void  {
    this.isLoading$ = this._store.select(fromRoot.GET_IS_LOADING);
    this._subscriptions.push(this._trainingService.getAvailableExercises
      .subscribe((exercises: Array<IExerciseModel>) => {
        this.exercises = exercises;
      }));
    this.fetchAvailableExercises();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  // Methods
  public fetchAvailableExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  public onStartTraining(chosenId: string): void {
    this._trainingService.startExercise(chosenId);
  }

}
