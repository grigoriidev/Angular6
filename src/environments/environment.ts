// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // hostname : 'http://localhost/windem-api/public',
    // resourceUrl : 'http://localhost:4200/#/',
    version: 'DEV',
    hostname : 'http://192.168.0.67/windem-api-master/public',
    resourceUrl : 'http://localhost:4200/#/'
    // hostname:'http://174.129.70.71/windem-api/public',
    // resourceUrl: 'http://174.129.70.71/runtogether/#/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
