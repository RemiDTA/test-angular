# TestAngular
Ce projet front se lance en duo avec le back projet_test_springboot (https://github.com/RemiDTA/projet_test_springboot) et nécessite donc que projet_test_springboot soit lancé avant de lancer ce projet (cf le readme https://github.com/RemiDTA/projet_test_springboot#readme pour voir quels sont les prérequis du back office).

Les prérequis du front sont les suivants (en plus de ceux du back) :
Télécharger Node.js et npm (npm est inclu dans node normalement) => permet de générer un serveur front local (npm permet d'installer des packages un peut comme maven)
Télécharger angular cli (npm install -g @angular/cli) => permet via des lignes de commandes de générés des templates de code (des composants, des services, ...)
Télécharger l'IDE VisualCodeStrudio
Télécharger les bibliothèques nécessaire, pour ce faire executer depuis le terminal VSC les commandes suivantes :
npm install ngx-cookie-service --save
npm install rxjs

Executer "ng serve" depuis la ligne de commande du terminal de Visual Code studio pour lancer le server front sur le port 42000.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
