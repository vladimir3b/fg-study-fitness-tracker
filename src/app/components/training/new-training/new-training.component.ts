import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from './../../../services/training.service';
import { IExerciseModel } from 'src/app/models/exercise.model';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { AppReducer as fromRoot } from 'src/app/reducers/app.reducer';
import { TrainingReducer as fromTraining } from 'src/app/reducers/training.reducer';

@Component({
  selector: 'fg-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit{

  // Properties
  public isLoading$: Observable<boolean>;
  public exercises$: Observable<Array<IExerciseModel>>;

  // Class Constructor
  constructor(
      private _trainingService: TrainingService,
      private _userInterfaceService: UserInterfaceService,
      private _store: Store<fromTraining.IState>
  ) { }

  // Life-cycle hooks
  public ngOnInit(): void  {
    this.isLoading$ = this._store.select(fromRoot.GET_IS_LOADING);
    this.exercises$ = this._store.select(fromTraining.GET_AVAILABLE_TRAININGS);
    this.fetchAvailableExercises();
  }

  // Methods
  public fetchAvailableExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  public onStartTraining(chosenId: string): void {
    this._trainingService.startExercise(chosenId);
  }

}
