// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl : "http://localhost:8080/api/v1/student",
  backendDomain: "http://localhost:8080",
  backendStudentEndpoint: "/api/v1/student",
  domain: "Enter your domain",
  clientId: "Enter Client ID", 
  audience: 'http://localhost:8080',
  redirectUri: "http://localhost:4200/choose-dashboard",

};