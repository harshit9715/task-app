# Task App

A simple NodeJs Express backend application that remembers task and their status for you.
It works like a simple ToDo application.

## Documentation

You can check out these API documentations:

- [Github](./docs/TaskAPIDoc.md)
- [Postman](https://documenter.getpostman.com/view/8553846/TVt1ARGk)

**You can check out the deployed OpenAPI Documentation [here](https://task-9715.herokuapp.com/api-docs).**

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
