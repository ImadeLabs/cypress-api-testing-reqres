# Cypress API Testing - ReqRes

This project demonstrates API testing using Cypress.

![Test Results](screenshots/api-tests-passed.jpg)

## Test Coverage

- GET Users endpoint
- POST Login (valid credentials)
- Invalid Login (negative testing)
- Token validation

## Tools Used

- Cypress
- JavaScript
- ReqRes API

## How to Run

1. Clone the repo
2. Install dependencies:
   npm install
3. Add your API key in `cypress.env.json`
4. Run tests:
   npx cypress open
