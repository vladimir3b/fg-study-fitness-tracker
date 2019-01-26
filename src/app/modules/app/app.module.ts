// Adding angular elements
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

// Adding my elements
import { MaterialModule } from './../material/material.module';
import { RootComponent } from '../../components/root/root.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { RoutingModule } from './../routing/routing.module';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { SidenavListComponent } from '../../components/navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './../../services/auth.service';
import { TrainingService } from 'src/app/services/training.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { FgAngularFireModule } from './../angularfire/fg-angular-fire.module';
import { AuthModule } from './../auth/auth.module';
import { appReducer } from 'src/app/reducers/app.reducer';


@NgModule({
  declarations: [
    RootComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FgAngularFireModule,
    AuthModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot({
      ui: appReducer
    })
  ],
  providers: [
    AuthService,
    TrainingService,
    UserInterfaceService
  ],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
