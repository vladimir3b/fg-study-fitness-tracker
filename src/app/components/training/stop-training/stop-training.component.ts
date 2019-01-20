import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'fg-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.scss']
})
export class StopTrainingComponent implements OnInit {

  // Class Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: { progress: number } ) { }

  // Life-cycle hooks
  ngOnInit() {
  }

}
