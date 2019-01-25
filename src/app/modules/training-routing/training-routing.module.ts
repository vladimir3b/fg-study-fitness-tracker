// Adding angular elements
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Adding my elements
import { TrainingComponent } from './../../components/training/training.component';

const ROUTES: Routes = [
  {
    path: '',
    component: TrainingComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(ROUTES) ],
  exports: [ RouterModule ]
})
export class TrainingRoutingModule { }
