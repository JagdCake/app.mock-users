# MockPeople

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## First Time Setup
Run `npm install` and `yarn global add @angular/cli` OR `npm install -g @angular/cli`.
Create a file called `environment.private.ts` inside `src/environments/`.
Add the following to the file:
```
export const privateEnv = {
    apiKey: 'YOUR API KEY HERE',
};
```
**Note:** Sometimes the API doesn't accept POST requests to add a new user. Resend the form, it generally works the second time.  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` (make sure not to change the port). The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
