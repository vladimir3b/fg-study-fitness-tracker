import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { IExerciseModel } from 'src/app/models/exercise.model';
import { TrainingService } from './../../../services/training.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'fg-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy{

  // Properties
  @ViewChild(MatSort) private _sort: MatSort;
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  private _subscriptions: Array<Subscription>;
  public displayedColumns: Array<string>;
  public pastExercises: MatTableDataSource<IExerciseModel>;
  public pageSizeOptions: Array<number>;
  public pageSizeOptionsIndex: number;
  public isLoading: boolean;

  // Class Constructor
  constructor(
      private _trainingService: TrainingService,
      private _userInterfaceService: UserInterfaceService
  ) {
    this.displayedColumns = [
      'date',
      'name',
      'calories',
      'duration',
      'state'
    ];
    this._subscriptions = [];
    this.isLoading = false;
    this.pastExercises = new MatTableDataSource();
    this.pageSizeOptionsIndex = 2;
    this.pageSizeOptions = [1, 2, 5, 10, 25, 50, 100];
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this._subscriptions.push(this._userInterfaceService.loadingPastExercisesInProgress
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      }));
    this._subscriptions.push(this._trainingService.getPastExercises
      .subscribe((exercises: Array<IExerciseModel>) => {
        this.pastExercises.data = exercises;
      }));
    this._trainingService.fetchPastExercises();
  }

  public ngAfterViewInit(): void {
    this.pastExercises.sort = this._sort;
    this.pastExercises.paginator = this._paginator;
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  // Methods
  public doFilter(filterString: string): void {
    this.pastExercises.filter = filterString.trim().toLowerCase();
  }

}

