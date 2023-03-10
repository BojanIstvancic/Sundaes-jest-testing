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

(REST)

- create handlers, mocks/handlers.js
- create server (node), mocks/server.js - we can find this in documentation
- setup mock service worker - setupTests.js - this file comes with create-react-app
- test elements when populated asynchronously
- mimic server erorr "500"

## Debugging

- p - filter for searching and running particular files
- test.only - if we wanted to test only that test when running particular file
- test.skip - if we want to skip the test
- waitFor - when we want to wait some period of time - like setTimeout
- screen.debug() - print what's how dooms looks like at the current point of the testing

## Create tests that are using contextProvider

- render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider }); (provide a wrapper/context/redux..)
- create custom utility function that contains Wrapper alreadt **testing-library-utils.jsx**

## Mocking function

- jest.fn() - if we are using typescript and passing a function as a prop is required. Also if we have some function
  that returns some data we can mock (mimik) the function and return some value without pulling actuall function.
  Basically we can simulate a function without pulling them.
