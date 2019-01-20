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

  @Output() public sidenavToggle: EventEmitter<void>; 

  constructor() { 
    this.sidenavToggle = new EventEmitter();
  }

  ngOnInit() {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
