import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'fg-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Subscription;
  @Output() public closeSidenav: EventEmitter<void>;
  public isAuth: boolean;
  public loggedUser: string;

  // Class Constructor
  constructor(private _authService: AuthService) {
    this.closeSidenav = new EventEmitter();
    this.isAuth = false;
  }

  // Life-cycle hooks
  ngOnInit() {
    this._subscription = this._authService.authChange.subscribe((authStatus: boolean) => {
      this.loggedUser = this._authService.loggedUser;
      this.isAuth = authStatus;
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  // Methods
  public onSidenavClose(): void {
    this.closeSidenav.emit();
    this._authService.logout();
  }

}
