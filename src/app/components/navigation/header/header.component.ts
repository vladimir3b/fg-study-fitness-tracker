import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'fg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Subscription;
  @Output() public sidenavToggle: EventEmitter<void>;
  public isAuth: boolean;

  // Class constructor
  constructor(private authService: AuthService) {
    this.isAuth = false;
    this.sidenavToggle = new EventEmitter();
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this._subscription = this.authService.authChange.subscribe((authStatus: boolean) => {
      this.isAuth = authStatus;
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  // Methods
  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
