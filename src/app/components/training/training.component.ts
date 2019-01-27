import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { TrainingService } from 'src/app/services/training.service';
import { TrainingReducer as fromTraining } from 'src/app/reducers/training.reducer';

@Component({
  selector: 'fg-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  // Properties
  public ongoingTraining$: Observable<boolean>;

  // Class Constructor
  constructor(
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.IState>
  ) { }

  // Life-cycle hooks
  public ngOnInit(): void {
    this.ongoingTraining$ = this._store.select(fromTraining.GET_IS_TRAINING);
  }

}
