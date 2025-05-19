# TodoMVC E2E Test Automation Project

This project is an end-to-end (E2E) test automation suite built using WebdriverIO (WDIO) to validate functionality of the TodoMVC application.

## Tech stack
This test automation project is built using:
- **Javascript** as the programming language
- **Mocha** as the test framework
- **WebDriverIO** for browser automation

## Framework structure
The project follows the [**Page Object Model (POM)**](https://webdriver.io/docs/pageobjects) design pattern and is structured as follows:

```
TODOMVC-TESTS/
├── node_modules/              # Node dependencies
├── test/
│   ├── pageobjects/           # Page Object classes (shared UI logic and elements used by the spec files)
│   │   └── todo.page.js
│   └── specs/                 # Spec files (The actual tests with assertions)
│       ├── todo.add.e2e.js
│       ├── todo.complete.e2e.js
│       ├── todo.delete.e2e.js
│       ├── todo.filter.e2e.js
│       ├── todo.navigation.e2e.js
│       └── todo.update.e2e.js
├── .gitignore
├── package.json               # Project configuration and dependencies
├── package-lock.json
├── wdio.conf.js               # WDIO configuration file
└── README.md                  # Project documentation
```

## Dependencies
Ensure the following are installed on your machine:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

### Windows Users
- Download and install [Node.js](https://nodejs.org/en/download/) (includes npm).
- Confirm installation with:
```bash
node -v
npm -v
```

### Install Project Dependencies
Once Node.js is installed, navigate to the project root and run:

```bash
npm install
```

This installs:
- WebdriverIO
- Mocha (test runner)
- Required WDIO plugins and reporters

## Configuration
Core configuration like what kind of tests should run, which browsers should the tests run against, what reporting mechanism to you is all set in the `wdio.conf.js` file in the root folder.

You can modify settings like browser capabilities, baseUrl, timeouts, etc., in this file.

## How to run the tests?
### 1. Clone this Repo
```bash
git clone https://github.com/revatij880/todomvc-tests.git
cd todoMVC-tests
```

### 2. Install the dependencies
```bash
npm install
```

### 3. Run all tests
```bash
npx wdio run ./wdio.conf.js
```

### 4. Run specific spec file
```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/todo.add.e2e.js
```

## Implementation strategy overview

The objective of this project was to automate the end-to-end testing of the React TodoMVC web application using WebdriverIO. The strategy focused on readability and reusability.

### Page object model (POM)
Implemented for maintainability, readability and reusability by separating selectors/actions from test logic.

### Modular test structure
Test cases are grouped based on functionality:
- Adding, updating, deleting todos
- Completing and filtering todos
- Navigational flows

### Multi environment execution
Since the baseUrl is part of the configuration, you can run the tests against any environment (feature, stage, qa, production) by simply changing the baseUrl in the wdio.conf.js

### Easy CLI execution
Tests can be triggered with a single `npx` command via WebdriverIO.

### Why webdriverio?
WebDriverIO (WDIO) was chosen for this project because it is:

- Easy to Set up and use. WDIO offers an interactive CLI tool that makes project setup and configuration simple and beginner-friendly.
- Modern JavaScript/TypeScript support. It's built in JavaScript and fits naturally into modern web development stacks.
- Cross-Browser testing. WDIO allows automation across multiple browsers like Chrome, Firefox, Edge, and Safari, helping ensure your app behaves consistently for all users.
- Supports real browsers and headless modes.
- Plugin-rich ccosystem. WDIO supports a wide range of plugins for reporting, assertions, screenshots, and integration with CI/CD tools.
- Built-in waits & async/await Support. No need to manually handle timeouts or polling — WDIO has smart waits and supports async/await for cleaner test code.
- Strong community and documentation. Actively maintained with good documentation and community support to quickly resolve issues and keep the project up to date.