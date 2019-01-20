import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fg-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() public closeSidenav: EventEmitter<void>;

  constructor() { 
    this.closeSidenav = new EventEmitter();
  }

  ngOnInit() {
  }

  public onSidenavClose(): void {
    this.closeSidenav.emit();
  }

}
