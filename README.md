# Playwright Automation Project

A JavaScript-based end-to-end automation project using **Playwright Test**. This repository is used to practise browser automation, organise tests with the Page Object Model (POM), and explore **Playwright MCP (Model Context Protocol)** for browser inspection and interaction with an AI agent.

## Project Goals

- Learn and practise Playwright with JavaScript.
- Organise automation code using the Page Object Model.
- Keep URLs and test data separate from test specifications.
- Explore Playwright MCP for browser inspection and locator discovery.
- Automate login and inventory workflows on Sauce Demo.

## Tech Stack

- JavaScript
- Node.js and npm
- Playwright Test
- Playwright MCP
- Antigravity IDE

## Project Structure

```text
Playwright_Automation_Project/
├── .agents/
│   ├── AGENTS.md
│   └── mcp_config.json
├── .github/
│   └── workflows/
│       └── playwright.yml
├── e2e/
│   ├── pages/
│   │   ├── Login.js
│   │   └── Inventory.js
│   ├── test-data/
│   │   ├── url.js
│   │   ├── users.js
│   │   └── inventoryData.js
│   └── tests/
│       ├── login.spec.js
│       └── inventory.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

This reflects the files shown during project setup. Update this tree if the repository structure changes.

## Application Under Test

[Sauce Demo](https://www.saucedemo.com/)

## Test Coverage

### Login

- Verify the login page.
- Verify login with valid credentials.
- Verify login with invalid credentials.
- Verify login with a locked-out user.

### Inventory

- Verify the inventory page after successful login.
- Verify product listings.
- Verify product sorting.
- Verify Add to Cart functionality.

## Page Object Model

The project separates page interactions from test scenarios:

- `e2e/pages/` — page locators and reusable page actions.
- `e2e/tests/` — test scenarios and assertions.
- `e2e/test-data/` — application URLs and test data.

Keep each feature's page object and spec in separate files. Reuse existing methods and locators instead of creating duplicates.

## Playwright MCP Exploration

This project explores **Playwright MCP**, which allows an AI agent to interact with a browser through the Model Context Protocol.

The workspace MCP configuration is stored in:

```text
.agents/mcp_config.json
```

Example configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Project-specific agent instructions are stored in `.agents/AGENTS.md`.

Playwright MCP is used to:

- Open the Sauce Demo application in a browser.
- Inspect rendered page content and UI elements.
- Explore suitable locators.
- Interact with the browser during test exploration.

**Note:** MCP supports browser exploration and interaction. Automated test cases are executed separately using the Playwright Test runner. A successful MCP connection does not, by itself, mean that a test has passed.

## Setup

### Prerequisites

- Node.js
- npm
- Git

### Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Playwright_Automation_Project
```

### Install dependencies

```bash
npm ci
```

Install the browsers required by Playwright:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run login tests:

```bash
npx playwright test e2e/tests/login.spec.js
```

Run inventory tests:

```bash
npx playwright test e2e/tests/inventory.spec.js
```

Open the HTML report:

```bash
npx playwright show-report
```

Check `package.json` and `playwright.config.js` for the exact scripts and test directory configured in this repository.

## Using Playwright MCP

1. Open the project in Antigravity.
2. Confirm `.agents/mcp_config.json` exists.
3. Open **Manage MCPs** and check that the Playwright server is enabled and its tools are available.
4. Ask the agent to inspect the target page and explore locators.
5. Review generated code and ensure it follows the project's POM structure.
6. Run the test specs separately with Playwright Test.

## Coding Guidelines

- Follow `.agents/AGENTS.md`.
- Inspect existing files before adding or changing code.
- Keep locators and reusable page actions in page objects.
- Keep test scenarios and assertions in spec files.
- Store URLs and reusable test data in `e2e/test-data/`.
- Prefer accessible and stable Playwright locators.
- Reuse existing methods and avoid duplicate functions.
- Do not hardcode URLs or credentials in spec files.
- Do not commit secrets, browser state, or generated test artifacts.
- Avoid unrelated changes.

## Git Ignore

Ensure `.gitignore` excludes generated and local-only files, including:

```gitignore
node_modules/
playwright-report/
test-results/
.playwright-mcp/
```

Review the actual `.gitignore` before committing to ensure generated MCP logs and browser data are not included.

## Learning Focus

- JavaScript fundamentals for automation.
- Playwright locators, actions, assertions, and auto-waiting.
- Page Object Model.
- Test data and URL organisation.
- Browser exploration with Playwright MCP.
- Test execution and HTML reports.

---





