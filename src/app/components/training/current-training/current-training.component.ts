import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';

import { StopTrainingComponent } from './../stop-training/stop-training.component';
import { TrainingService } from 'src/app/services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';
import { TrainingReducer as fromTraining } from 'src/app/reducers/training.reducer';


@Component({
  selector: 'fg-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  // Properties
  public currentExercise: IExerciseModel;
  public progress: number;
  public timer: number;

  // Class Constructor
  constructor(
      private _dialog: MatDialog,
      private _trainingService: TrainingService,
      private _store: Store<fromTraining.IState>
  ) {
    this.progress = 0;
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this.controlTimer();
  }

  // Methods
  public controlTimer(): void {
    this._store.select(fromTraining.GET_ACTIVE_TRAINING)
      .pipe(take(1))
      .subscribe((exercise: IExerciseModel) => {
        this.currentExercise = exercise;
        this.timer = <any>setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this._trainingService.terminateExercise(100);
            clearInterval(this.timer);
          }
      }, this.currentExercise.duration * 10); // modify this to 10 in the final version
    });
  }

  public onStop(): void {
    clearInterval(this.timer);
    const dialogReference: MatDialogRef<StopTrainingComponent> = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogReference.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._trainingService.terminateExercise(this.progress);
      } else {
        this.controlTimer();
      }
    });
  }

}
