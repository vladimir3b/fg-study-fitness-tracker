import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'fg-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  // Class Constructor
  constructor(private _authService: AuthService) { }

  // Life-cycle hooks
  ngOnInit() {
    this._authService.initAuthListener();
  }

}
