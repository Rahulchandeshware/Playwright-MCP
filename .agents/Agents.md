# Playwright Automation Project --- Agent Rules

These instructions apply to this Playwright project. Follow them
whenever you inspect, plan, create, or modify automation code.

## 1. Project structure

The project currently includes this structure:

``` text
Playwright_Automation_Project/
├── .agents/
│   ├── mcp_config.json
│   └── AGENTS.md
├── .github/
├── e2e/
│   ├── pages/
│   │   └── Login.js
│   ├── test-data/
│   │   └── url.js
│   └── tests/
│       └── login.spec.js
├── node_modules/
├── playwright-report/
├── test-results/
├── tests/
├── .gitignore
├── package-lock.json
├── package.json
└── playwright.config.js
```

The repository contains both `e2e/tests/` and a root-level `tests/`
directory. **Do not assume they serve the same purpose.** Before adding
or moving a test, inspect `playwright.config.js`, existing test files,
and the current project conventions to determine the configured test
directory and the correct location.

The structure above reflects the workspace as currently shown. It may
change; always inspect the live files before making decisions.

## 2. General working rules

1.  Understand the existing project before writing code.
2.  Inspect `package.json`, `playwright.config.js`, the relevant page
    object, URL/test-data files, and similar existing spec files.
3.  Follow the existing naming, formatting, import style, assertions,
    and coding patterns.
4.  Prefer reusing existing page objects, locators, helper methods,
    fixtures, and utilities.
5.  Do not create duplicate or unnecessary functions, classes, files, or
    folders.
6.  Do not refactor unrelated code while completing a task.
7.  Do not overwrite working code without explaining why the change is
    needed.
8.  Do not add packages, change configuration, update dependencies, or
    modify scripts unless required and approved by the user.
9.  Do not change the existing framework architecture without asking
    first.
10. Explain the planned files and changes before making significant
    edits. Ask for approval before destructive or broad changes.

## 3. Page Object Model (POM)

Use the project's existing Page Object Model approach.

-   Keep page locators and reusable page interactions in the appropriate
    existing page file.
-   Keep test scenarios and test assertions in the appropriate spec
    file, following the project's current convention.
-   Keep application URLs and route data in the existing URL/test-data
    file when that is how the project is organized.
-   Before adding a locator or method, search the project for an
    existing equivalent.
-   Reuse an existing method or locator when it correctly supports the
    new scenario.
-   Do not put all test logic into a page object.
-   Do not put large amounts of page interaction logic directly into a
    spec if the project already places those actions in page objects.
-   Use clear, descriptive names consistent with nearby code.

For the currently visible files, inspect these before deciding where
code belongs:

-   `e2e/pages/Login.js`
-   `e2e/test-data/url.js`
-   `e2e/tests/login.spec.js`

Do not assume every future task belongs in these files; select the
relevant existing page and spec after inspecting the application and
project.

## 4. URL and test-data rules

-   Do not hardcode application URLs in spec files or page objects when
    the project has a central URL/test-data file.
-   Reuse the existing URL constants or data structure in
    `e2e/test-data/url.js` if appropriate.
-   Do not invent routes, page titles, user data, or expected content.
-   If a required URL or expected value is missing, inspect the
    application or ask the user for the correct value.
-   Do not put passwords, access tokens, API keys, or other secrets in
    source files.
-   Use the project's existing environment-variable or secret-management
    approach for credentials. If none exists, ask before introducing
    one.

## 5. Locator rules

When using Playwright MCP to inspect a page:

1.  Navigate to the requested page and inspect the rendered UI.
2.  Prefer accessible and resilient locators:
    -   `getByRole()` with an accessible name
    -   `getByLabel()`
    -   `getByPlaceholder()` when the placeholder is stable and
        appropriate
    -   `getByText()` for stable user-visible text
    -   `getByTestId()` when the project/application provides stable
        test IDs
3.  Use CSS or XPath selectors only when better semantic locators are
    unavailable or the project already uses a suitable stable selector.
4.  Avoid brittle selectors based on generated classes, styling, DOM
    position, or `nth()` unless necessary.
5.  Check whether the locator is unique and targets the intended
    element.
6.  Do not invent a locator based only on a screenshot if the live page
    can be inspected.
7.  Follow the existing locator style in the relevant page object.

## 6. Playwright test-writing rules

-   Use the Playwright Test APIs already installed in this project.
-   Follow the project's existing import style, fixtures, hooks, and
    test organization.
-   Use `async`/`await` consistently for asynchronous browser
    operations.
-   Prefer Playwright's auto-waiting locators and web-first assertions.
-   Use appropriate assertions such as
    `await expect(locator).toBeVisible()` and
    `await expect(page).toHaveURL(...)`.
-   Avoid fixed sleeps such as `page.waitForTimeout()` unless there is a
    specific, justified reason.
-   Wait for a meaningful UI condition instead of guessing how long the
    page needs.
-   Make tests independent where practical; do not rely on execution
    order or state left by another test.
-   Use the project's configured base URL and existing navigation
    conventions.
-   Do not weaken or remove assertions just to make a failing test pass.
-   Do not catch and suppress test errors.
-   Do not mark tests as skipped, expected to fail, or conditionally
    passing without explaining the reason and asking for approval.

## 7. How to use Playwright MCP

Use the configured Playwright MCP server for browser-based inspection
and interaction when it is available.

MCP can help the agent:

-   Open a browser and navigate to a supplied URL.
-   Inspect the rendered page and accessible information.
-   Identify candidate locators.
-   Click, type, select, scroll, and interact with page elements.
-   Observe page state and help investigate browser-side failures.

MCP is an inspection and browser-interaction tool; it does not replace
the project's Playwright Test runner or the existing POM architecture.

When using MCP:

1.  Use only the URL and test account details supplied by the user or
    already configured safely in the project.
2.  Do not submit real transactions, make purchases, send messages,
    delete records, or perform other consequential actions unless the
    user explicitly asks and confirms.
3.  Do not expose credentials, cookies, tokens, personal data, or
    private application content in generated files or logs.
4.  Do not assume that a browser action proves an automated test is
    implemented.
5.  After inspection, implement tests in the repository's existing
    structure and run them with the project's configured Playwright
    commands.
6.  If MCP is unavailable, explain that clearly; do not pretend browser
    inspection was performed.

## 8. Required workflow for every automation task

Follow this sequence:

### Step 1 --- Understand

-   Read the task carefully.
-   Identify the page, user journey, expected behavior, and acceptance
    criteria.
-   Inspect the relevant existing files and similar tests.
-   Check the configured test directory and scripts.

### Step 2 --- Inspect with MCP when useful

-   Open the target application/page.
-   Inspect the relevant elements and interactions.
-   Identify reliable locators.
-   Report anything that cannot be verified.

### Step 3 --- Plan

Before editing, state: - Which files need to change. - What will be
added or reused in each file. - Which test cases will be covered. - Any
assumptions or missing information.

For small, clearly scoped changes, keep the plan concise.

### Step 4 --- Implement

-   Follow the existing POM and project conventions.
-   Reuse existing code wherever possible.
-   Keep changes limited to the requested task.
-   Do not make unrelated formatting or dependency changes.

### Step 5 --- Review

-   Review the diff.
-   Check imports, paths, names, locators, and assertions.
-   Check that no secrets or unrelated files were added.
-   Explain any remaining assumptions or limitations.

### Step 6 --- Run and report

-   Use the existing npm scripts or documented Playwright commands from
    `package.json`.
-   Run the narrowest relevant test first, then broader tests if
    appropriate.
-   Report the exact command used and whether it passed or failed.
-   If a test fails, provide the actual error and investigate it; do not
    claim success without execution evidence.

## 9. Git and change-safety rules

-   Do not run `git commit`, `git push`, merge, rebase, reset, or branch
    deletion unless the user explicitly asks.
-   Do not discard or overwrite the user's uncommitted changes.
-   Before editing a file with existing changes, inspect its current
    contents and preserve unrelated work.
-   Do not modify `.gitignore`, CI configuration, or pipeline files
    unless the task requires it and the user approves.
-   Summarize the files changed so the user can review the diff before
    committing.

## 10. Communication style

The user is learning Playwright and JavaScript. Explain important
decisions in clear, simple English.

When proposing code: - Show the file path where it belongs. - Explain
briefly why the code belongs there. - Explain new Playwright methods or
JavaScript concepts when they are introduced. - Prefer examples that
match this repository over generic framework rewrites.

Never say that code was tested, a browser was inspected, or a change was
saved unless that action actually happened.

## 11. Task-specific instructions take priority

Follow the user's current task and acceptance criteria. If a task
conflicts with these general rules, explain the conflict and ask which
requirement should take priority. Do not silently guess.
