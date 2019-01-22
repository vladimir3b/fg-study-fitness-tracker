import { Component, OnInit } from '@angular/core';

import { TrainingService } from './../../../services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';

@Component({
  selector: 'fg-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  // Properties
  public exercises: Array<IExerciseModel>;

  // Class Constructor
  constructor(private _trainingService: TrainingService) { }

  // Life-cycle hooks
  ngOnInit() {
    this.exercises = this._trainingService.availableExercises;
  }

  // Methods
  public onStartTraining(chosenId: string): void {
    this._trainingService.startExercise(chosenId);
  }

}
