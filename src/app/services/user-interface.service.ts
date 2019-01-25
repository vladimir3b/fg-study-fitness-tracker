import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  // Properties
  public loadingStateChanged: Subject<boolean>;

  // Class constructor
  constructor() {
    this.loadingStateChanged = new Subject();
  }

}
