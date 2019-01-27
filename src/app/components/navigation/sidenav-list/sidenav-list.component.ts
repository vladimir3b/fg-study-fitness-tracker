import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { AppReducer as fromRoot } from '../../../reducers/app.reducer';


@Component({
  selector: 'fg-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  // Properties
  private _subscription: Array<Subscription>;
  @Output() public closeSidenav: EventEmitter<void>;
  public isAuth$: Observable<boolean>;
  public loggedUser: string;

  // Class Constructor
  constructor(
    private _authService: AuthService,
    private _store: Store<fromRoot.IState>
  ) {
    this._subscription = [];
    this.closeSidenav = new EventEmitter();
  }

  // Life-cycle hooks
  ngOnInit() {
    this.isAuth$ = this._store.select(fromRoot.GET_IS_AUTHENTICATED);
    this._subscription.push(this._authService.loggedUser.subscribe((userName: string) => {
      this.loggedUser = userName;
      console.log(userName);
    }));
  }

  public ngOnDestroy(): void {
    this._subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // Methods
  public onSidenavClose(): void {
    this.closeSidenav.emit();
    this._authService.logout();
  }

}
