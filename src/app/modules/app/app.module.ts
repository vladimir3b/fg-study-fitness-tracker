import { FgAngularFireModule } from './../angularfire/fg-angular-fire.module';
// Adding angular elements
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Adding my elements
import { MaterialModule } from './../material/material.module';
import { RootComponent } from '../../components/root/root.component';
import { SignupComponent } from '../../components/auth/signup/signup.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { TrainingComponent } from '../../components/training/training.component';
import { CurrentTrainingComponent } from '../../components/training/current-training/current-training.component';
import { NewTrainingComponent } from '../../components/training/new-training/new-training.component';
import { PastTrainingsComponent } from '../../components/training/past-trainings/past-trainings.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { RoutingModule } from './../routing/routing.module';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { SidenavListComponent } from '../../components/navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from '../../components/training/stop-training/stop-training.component';
import { AuthService } from './../../services/auth.service';
import { TrainingService } from 'src/app/services/training.service';


@NgModule({
  declarations: [
    RootComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FgAngularFireModule
  ],
  providers: [
    AuthService,
    TrainingService
  ],
  bootstrap: [ RootComponent ],
  entryComponents: [ StopTrainingComponent ]
})
export class AppModule { }
