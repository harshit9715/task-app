# Task App

A simple NodeJs Express backend application that remembers task and their status for you.
It works like a simple ToDo application.

## Deployment

```bash
# Install dependencies
npm i
# Create .env file if not yet created and add environment variables required in /src/config.js
touch config/dev.env
# Run the application
npm run start
```

## Unit testing

Test suite contains 28 tests. Tested using Jest framework.

```bash
# Install dev dependencies
npm i --dev
# Create qa.env file if not yet created and add environment variables required in /src/config.js
touch config/qa.env
# Run the application
npm run test
```

## Tech Stack

- NodeJS

## Requirements

- NodeJS 10+ and NPM
- enviroment variables setup (in .env file)

## Documentation

You can check out the documentation [here](./docs/TaskAPIDoc.md).
You can check out the deployed version [here](https://documenter.getpostman.com/view/8553846/TVt18jZN).
