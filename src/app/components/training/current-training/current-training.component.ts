import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { StopTrainingComponent } from './../stop-training/stop-training.component';
import { TrainingService } from 'src/app/services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';


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
      private _trainingService: TrainingService
  ) {
    this.progress = 0;
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this.currentExercise = this._trainingService.currentExercise;
    this.controlTimer();
  }

  // Methods
  public controlTimer(): void {
    this.timer = <any>setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this._trainingService.terminateExercise(100);
        clearInterval(this.timer);
      }
    }, this.currentExercise.duration * 10);
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
