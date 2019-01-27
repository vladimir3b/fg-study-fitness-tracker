import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator
} from '@angular/material';
import { Store } from '@ngrx/store';

import { IExerciseModel } from 'src/app/models/exercise.model';
import { TrainingService } from './../../../services/training.service';
import { TrainingReducer as fromTraining } from 'src/app/reducers/training.reducer';
import { AppReducer as fromRoot } from 'src/app/reducers/app.reducer';



@Component({
  selector: 'fg-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  // Properties
  @ViewChild(MatSort) private _sort: MatSort;
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  public displayedColumns: Array<string>;
  public pastExercises: MatTableDataSource<IExerciseModel>;
  public pageSizeOptions: Array<number>;
  public pageSizeOptionsIndex: number;
  public isLoading$: Observable<boolean>;

  // Class Constructor
  constructor(
      private _trainingService: TrainingService,
      private _store: Store<fromTraining.IState>
  ) {
    this.displayedColumns = [
      'date',
      'name',
      'calories',
      'duration',
      'state'
    ];
    this.pastExercises = new MatTableDataSource();
    this.pageSizeOptionsIndex = 2;
    this.pageSizeOptions = [1, 2, 5, 10, 25, 50, 100];
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRoot.GET_IS_LOADING);
    this._store.select(fromTraining.GET_FINISHED_TRAININGS)
      .subscribe((exercises: Array<IExerciseModel>) => {
        this.pastExercises.data = exercises;
      });
    this._trainingService.fetchPastExercises();
  }

  public ngAfterViewInit(): void {
    this.pastExercises.sort = this._sort;
    this.pastExercises.paginator = this._paginator;
  }

  // Methods
  public doFilter(filterString: string): void {
    this.pastExercises.filter = filterString.trim().toLowerCase();
  }

}

