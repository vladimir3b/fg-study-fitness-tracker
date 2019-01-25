import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from './../../../services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'fg-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // Properties
  private _subscriptions: Array<Subscription>;
  public isLoading: boolean;
  public exercises: Array<IExerciseModel>;

  // Class Constructor
  constructor(
      private _trainingService: TrainingService,
      private _userInterfaceService: UserInterfaceService
  ) {
    this._subscriptions = [];
    this.isLoading = false;
  }

  // Life-cycle hooks
  public ngOnInit(): void  {
    this._subscriptions.push(this._userInterfaceService.loadingAvailableExercisesInProgress
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      }));
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
