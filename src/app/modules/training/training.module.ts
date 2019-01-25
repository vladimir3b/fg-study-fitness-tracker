import { NgModule } from '@angular/core';

import { TrainingComponent } from '../../components/training/training.component';
import { CurrentTrainingComponent } from '../../components/training/current-training/current-training.component';
import { NewTrainingComponent } from '../../components/training/new-training/new-training.component';
import { PastTrainingsComponent } from '../../components/training/past-trainings/past-trainings.component';
import { StopTrainingComponent } from '../../components/training/stop-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [ SharedModule ],
  entryComponents: [ StopTrainingComponent ]
})
export class TrainingModule { }
