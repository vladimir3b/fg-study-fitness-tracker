import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './../../components/auth/login/login.component';
import { SignupComponent } from './../../components/auth/signup/signup.component';
import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './../auth-routing/auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
