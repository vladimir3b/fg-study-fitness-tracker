import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { StopTrainingComponent } from './../stop-training/stop-training.component';

@Component({
  selector: 'fg-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  // Properties
  @Output() trainingExit: EventEmitter<void>;
  public progress: number;
  public timer: number;

  // Class Constructor
  constructor(private dialog: MatDialog) {
    this.progress = 0;
    this.trainingExit = new EventEmitter();
  }

  // Life-cycle hooks
  ngOnInit() {
    this.controlTimer();
  }

  // Methods
  public controlTimer(): void {
    this.timer = <any>setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  public onStop(): void {
    clearInterval(this.timer);
    const dialogReference: MatDialogRef<StopTrainingComponent> = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogReference.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.controlTimer();
      }
    });
  }

}
