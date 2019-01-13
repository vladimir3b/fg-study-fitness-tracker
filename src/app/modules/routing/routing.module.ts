// Adding angular elements
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Adding my elements
import { WelcomeComponent } from './../../components/welcome/welcome.component';
import { TrainingComponent } from './../../components/training/training.component';
import { LoginComponent } from './../../components/auth/login/login.component';
import { SignupComponent } from './../../components/auth/signup/signup.component';

const ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'training',
    component: TrainingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
