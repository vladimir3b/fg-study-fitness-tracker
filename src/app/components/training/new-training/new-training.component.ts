import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from './../../../services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';

@Component({
  selector: 'fg-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Subscription;
  public isLoading: boolean;
  public exercises: Array<IExerciseModel>;

  // Class Constructor
  constructor( private _trainingService: TrainingService ) {
    this.isLoading = true;
  }

  // Life-cycle hooks
  public ngOnInit(): void  {
    this._subscription = this._trainingService.getAvailableExercises
      .subscribe(() => {
        this.exercises = this._trainingService.availableExercises;
        this.isLoading = false;
      });
    this._trainingService.fetchAvailableExercises();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  // Methods
  public onStartTraining(chosenId: string): void {
    this._trainingService.startExercise(chosenId);
  }

}
