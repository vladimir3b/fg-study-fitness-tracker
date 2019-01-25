// Adding angular elements
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Adding my elements
import { WelcomeComponent } from './../../components/welcome/welcome.component';
import { AuthGuardService } from './../../services/auth-guard.service';

const ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'training',
    loadChildren: '../training/training.module#TrainingModule',
    canLoad: [AuthGuardService]
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ],
  providers: [ AuthGuardService ]
})
export class RoutingModule { }
