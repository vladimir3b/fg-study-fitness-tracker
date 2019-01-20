import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'fg-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  // Properties
  @Output() public startTraining: EventEmitter<void>;

  // Class Constructor
  constructor() {
    this.startTraining = new EventEmitter();
  }

  // Life-cycle hooks
  ngOnInit() {
  }

  // Methods
  public onStartTraining(): void {
    this.startTraining.emit();
  }

}
