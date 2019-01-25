import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TrainingService } from 'src/app/services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';

@Component({
  selector: 'fg-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Subscription;
  public ongoingTraining: boolean;

  // Class Constructor
  constructor(private _trainingService: TrainingService) {
    this.ongoingTraining = false;
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this._subscription = this._trainingService.changedExercise
      .subscribe((exercise: IExerciseModel) => {
        this.ongoingTraining = (exercise) ? true : false;
      });
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
