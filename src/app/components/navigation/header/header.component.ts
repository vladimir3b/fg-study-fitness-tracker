import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'fg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Properties
  @Output() public sidenavToggle: EventEmitter<void>;

  // Class constructor
  constructor() {
    this.sidenavToggle = new EventEmitter();
  }

  // Life-cycle hooks
  ngOnInit() {
  }

  // Methods
  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
