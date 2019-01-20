import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fg-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  // Properties
  @Output() public closeSidenav: EventEmitter<void>;

  // Class Constructor
  constructor() {
    this.closeSidenav = new EventEmitter();
  }

  // Life-cycle hooks
  ngOnInit() {
  }

  // Methods
  public onSidenavClose(): void {
    this.closeSidenav.emit();
  }

}
