# Project for JEST Testing practice

## SETUP ESLint and Prettier

- npm install eslint-plugin-testing-library eslint-plugin-jest-dom
- remove eslintConfig from package.json
- create .eslintrc.json and add standard config
- add .eslintcache and .vscode to .gitignore
- create .vscode/settings.json and add standard config

## Add react bootstrap

- npm install react-bootstrap bootstrap
- add bootstrap global scripts in index.html
- add css import to index.js

## Add the latest version of the user event

- npm install @testing-library/user-event@^14

## Content:

### create simple test using userEvent (sesion/await)

### Simulate response using Mock Service Worker (intercept real request and return mocked data)

- create handlers, mocks/handlers.js
- create server (node), mocks/server.js - we can find this in documentation
- setup mock service worker - setupTests.js - this file comes with create-react-app
