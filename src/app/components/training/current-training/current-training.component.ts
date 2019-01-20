import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fg-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  // Properties
  public progress: number;
  public timer: number;

  // Class Constructor
  constructor() {
    this.progress = 0;
  }

  // Life-cycle hooks
  ngOnInit() {
    this.timer = <any>setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 100);
  }

  // Methods
  public onStop(): void {
    clearInterval(this.timer);
  }

}
