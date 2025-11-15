# wpbest
wpbest is a repository that contains the source code for http://wpbest.org, the official website for William Paul Best. The site showcases his 40+ years of experience as a Computer Scientist and Mathematician in Artificial Intelligence and promotes his YouTube channel 'wpbest'.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

# Developemnt Environment

## install Node JS
```bash
nvm list
nvm install 22.21.1
nvm use 22.21.1
```

## Install Angular
```bash
npm install -g @angular/cli
```

## Install Firebase Tools and CLI
```bash
npm i -g firebase-tools
```

## Install Google Gemini CLI
```bash
npm install -g @google/gemini-cli
```

## Install NPM Check Update (NCU) and Check packages.json for outdated packages
```bash
npm install -g npm-check-updates
```
At times, the package.json file can get out of date from what is current. To check for outdated packages install npm-check-updates, run ncu to see outdated packages, and then run ncu -u to update the packages.

```bash
ncu
ncu -u
npm install
npm update
```

## Run Google Gemini CLI
```bash
gemini
```

## Create the application 
```bash
ng new wpbest --routing --style scss --skip-install --skip-git --strict --ssr
```
✔ Do you want to create a 'zoneless' application without 
zone.js? Yes 
✔ Which AI tools do you want to configure with Angular   
best practices? https://angular.dev/ai/develop-with-ai   
None, Gemini         [ 
https://ai.google.dev/gemini-api/docs 
        ] 
CREATE wpbest/angular.json (2656 bytes) 
CREATE wpbest/package.json (1331 bytes) 
CREATE wpbest/README.md (1529 bytes) 
CREATE wpbest/tsconfig.json (1026 bytes) 
CREATE wpbest/.editorconfig (331 bytes) 
CREATE wpbest/.gitignore (647 bytes) 
CREATE wpbest/tsconfig.app.json (464 bytes) 
CREATE wpbest/tsconfig.spec.json (449 bytes) 
CREATE wpbest/.vscode/extensions.json (134 bytes) 
CREATE wpbest/.vscode/launch.json (490 bytes) 
CREATE wpbest/.vscode/tasks.json (980 bytes) 
CREATE wpbest/src/main.ts (228 bytes) 
CREATE wpbest/src/index.html (305 bytes) 
CREATE wpbest/src/styles.scss (81 bytes) 
CREATE wpbest/src/main.server.ts (300 bytes) 
CREATE wpbest/src/server.ts (1677 bytes) 
CREATE wpbest/src/app/app.spec.ts (805 bytes) 
CREATE wpbest/src/app/app.ts (301 bytes) 
CREATE wpbest/src/app/app.scss (0 bytes) 
CREATE wpbest/src/app/app.html (20464 bytes) 
CREATE wpbest/src/app/app.config.ts (524 bytes) 
CREATE wpbest/src/app/app.routes.ts (80 bytes) 
CREATE wpbest/src/app/app.config.server.ts (438 bytes) 
CREATE wpbest/src/app/app.routes.server.ts (174 bytes) 
CREATE wpbest/public/favicon.ico (15086 bytes) 
CREATE wpbest/.gemini/GEMINI.md (1983 bytes) 

# Add Progressive Web App
```bash
ng add @angular/pwa
```
✔ Determining Package Manager 
  › Using package manager: npm 
✔ Searching for compatible package version 
  › Found compatible package version: @angular/pwa@20.3.10. 
✔ Loading package information from registry 
✔ Confirming installation 
✔ Installing package in temporary location 
CREATE ngsw-config.json (669 bytes) 
CREATE public/manifest.webmanifest (1276 bytes) 
CREATE public/icons/icon-128x128.png (2875 bytes)
CREATE public/icons/icon-144x144.png (3077 bytes) 
CREATE public/icons/icon-152x152.png (3293 bytes) 
CREATE public/icons/icon-192x192.png (4306 bytes) 
CREATE public/icons/icon-384x384.png (11028 bytes) 
CREATE public/icons/icon-512x512.png (16332 bytes) 
CREATE public/icons/icon-72x72.png (1995 bytes) 
CREATE public/icons/icon-96x96.png (2404 bytes) 
UPDATE angular.json (2750 bytes) 
UPDATE package.json (1373 bytes) 
UPDATE src/app/app.config.ts (751 bytes) 
UPDATE src/index.html (441 bytes) 
✔ Packages installed successfully. 

After running the application you should see an install option

# Build

## Install package library dependencies
```bash
npm install
```
## Development servernpm

To start a local development server, run:

```bash
ng serve -o
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
