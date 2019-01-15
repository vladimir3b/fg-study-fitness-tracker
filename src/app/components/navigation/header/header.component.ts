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

  sidenavToggle = new EventEmitter

  constructor() { }

  ngOnInit() {
  }

  public onToggleSidenav(): void {

  }
}
