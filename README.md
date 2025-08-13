# UI Test - Data Grid

ThThis project is a reusable Data Grid component built for a UI test using React, Vite, Vitest, and React Testing Library.

## Features

- Data Grid operates in two modes:
  - With row selection: Select individual rows, select all, or deselect all. Custom actions can be performed on selected rows.
  - Without row selection: Simple grid display.
- Choose which columns to display and apply custom styles to column entries.
- Supports dark mode for better accessibility and user experience.

## Status & Improvements

- A modal is used instead of an alert box for better aesthetics. Modal accessibility can be further improved.
- Core functionalities are well-tested with around 95% coverage. Additional tests for modal interactions can be added.
- Accessibility for core funcitons is prioritized, with a 100% score in Lighthouse. Linting plugins were used to maximize coverage.
- Virtusalization or Pagination can be considered for larger data sets. 
- Column status indicator, can supoport a variety of data types as well as matchers(equals, range)
- CoulmnSyles - can support conditional styles
- Non visible columns can be unique and pivot

## Running the Project

To start the project in development mode:

```bash
npm install
npm run dev
```

To run unit tests:

```bash
npm run test
```

To view test results in the browser:

```bash
npm run test:ui
```

The test results will open in a separate browser tab.

Thank you for reviewing this project!
