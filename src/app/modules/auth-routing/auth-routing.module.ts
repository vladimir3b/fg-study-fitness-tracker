// Adding angular elements
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Adding my elements
import { LoginComponent } from './../../components/auth/login/login.component';
import { SignupComponent } from './../../components/auth/signup/signup.component';

const ROUTES: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(ROUTES) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}

