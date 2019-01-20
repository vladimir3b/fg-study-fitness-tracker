import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fg-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  // Properties
  public ongoingTraining: boolean;

  // Class Constructor
  constructor() {
    this.ongoingTraining = false;
  }

  // Life-cycle hooks
  ngOnInit() {
  }

}
