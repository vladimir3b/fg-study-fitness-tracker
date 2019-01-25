import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  // Properties
  public loggingInProgress: Subject<boolean>;
  public registeringProgress: Subject<boolean>;
  public loadingAvailableExercisesInProgress: Subject<boolean>;
  public loadingPastExercisesInProgress: Subject<boolean>;

  // Class constructor
  constructor(private _snackbar: MatSnackBar) {
    this.loggingInProgress = new Subject();
    this.registeringProgress = new Subject();
    this.loadingAvailableExercisesInProgress = new Subject();
    this.loadingPastExercisesInProgress = new Subject();
  }

  // Methods
  public showSnackBarMessages(message: string, action: string, duration: number): void {
    this._snackbar.open(message, action, {
      duration: duration
    });
  }

}
