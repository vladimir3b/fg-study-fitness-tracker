import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';

import { environment } from './../../../environments/environment';

const ANGULARFIRE_MODULES = [
  AngularFirestoreModule
];

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ...ANGULARFIRE_MODULES
  ],
  exports: [
    AngularFireModule,
    ...ANGULARFIRE_MODULES
  ],
  providers: [
    {
      provide: FirestoreSettingsToken,
      useValue: {}
    }
  ]
  /**
   * In this case providers is not mandatory but it will resolve the warning:
   *
   *  @firebase/firestore: Firestore (5.8.0):
   *  The timestampsInSnapshots setting now defaults to true and you no
   *  longer need to explicitly set it. In a future release, the setting
   *  will be removed entirely and so it is recommended that you remove it
   *  from your firestore.settings() call now.
   *
   *  as shown in https://github.com/angular/angularfire2/issues/1993
   *
   */
})
export class FgAngularFireModule { }
