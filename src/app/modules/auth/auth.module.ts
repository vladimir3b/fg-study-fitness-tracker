import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../material/material.module';
import { LoginComponent } from './../../components/auth/login/login.component';
import { SignupComponent } from './../../components/auth/signup/signup.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
