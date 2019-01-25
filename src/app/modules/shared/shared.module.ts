import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { FgAngularFireModule } from '../angularfire/fg-angular-fire.module';

const MODULES = [
  CommonModule,
  FormsModule,
  FlexLayoutModule,
  MaterialModule,
  FgAngularFireModule
];

@NgModule({
  declarations: [],
  imports: [ ... MODULES ],
  exports: [ ... MODULES ]
})
export class SharedModule { }
