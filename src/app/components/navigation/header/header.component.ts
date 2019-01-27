import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AppReducer as fromRoot } from '../../../reducers/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'fg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Array<Subscription>;
  @Output() public sidenavToggle: EventEmitter<void>;
  public isAuth$: Observable<boolean>;
  public loggedUser: string;

  // Class constructor
  constructor(
    private _authService: AuthService,
    private _store: Store<fromRoot.IState>
  ) {
    this._subscription = [];
    this.sidenavToggle = new EventEmitter();
  }

  // Life-cycle hooks
  public ngOnInit(): void {
    this.isAuth$ = this._store.select(fromRoot.GET_IS_AUTHENTICATED);
    this._subscription.push(this._authService.loggedUser.subscribe((userName: string) => {
      this.loggedUser = userName;
    }));
  }

  public ngOnDestroy(): void {
    this._subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // Methods
  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this._authService.logout();
  }

}
