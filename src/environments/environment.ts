// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDQsb3y9qqLCG7uAiFBu1rXYNiLvweNBH0',
    authDomain: 'fg-fitness-tracker.firebaseapp.com',
    databaseURL: 'https://fg-fitness-tracker.firebaseio.com',
    projectId: 'fg-fitness-tracker',
    storageBucket: 'fg-fitness-tracker.appspot.com',
    messagingSenderId: '321179874813'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
