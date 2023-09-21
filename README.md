# Mission of Hope

## Overview

[Mission of Hope](https://missionofhope.org/) distributes school supplies to the poorest communities in rural Appalachia. They are partnered with 42 elementary and high schools in Southeast Kentucky and Northeast Tennessee. Additionally, they give toys, food, hygiene products, and clothes to children and families. Every year, they provide direct aid to over 13,000 children and families.

This project aims to creat an inventory/donation system.

## Getting Started

### Prerequisites

<!-- Ensure any other prerequisites your project needs are mentioned here. -->

- [Node.js (v18)](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Visual Studio Code](https://code.visualstudio.com/)

<!-- Add or modify steps here for getting started as a developer -->

### 1. Clone the repository

```bash
git clone https://github.com/hack4impact-utk/[PROJECT NAME].git
```

### 2. Open project in VS Code and accept recommended extensions

### 3. Install dependencies

```bash
pnpm install
```

### 4. Set the environment variables

Either ask a project lead for the `.env.local` file or create your own. The `.env.local` file should be in the root directory of the project. You need to have the following variables set:

<!-- Add any other environment variables your project requires to this table. -->

| Variable Name | Description              |
| ------------- | ------------------------ |
| MONGODB_URI   | URI for MongoDB database |

### 5. Run the development server

```bash
pnpm dev
```

## Building for Production

Make sure you have finished all the setup steps in the [Getting Started](#getting-started) section and you can run the development server before building for production.

### 1. Build the project

```bash
pnpm build
```

### 2. Run the project in production mode

```bash
pnpm start
```

## Testing

### Running tests

```bash
pnpm test
```

## Code/PR Workflow

<!-- Add any project specific workflows in here -->

- Create a new branch in the format `[GITHUB USERNAME]/[SHORT FEATURE DESCRIPTION]-[ISSUE NUMBER]`
  - For example: `hack4impact-utk/add-login-page-1`
- Make changes on your branch, ensuring you adhere to our style guide and best practices (add links here when ready)
- Commit your changes and push them to GitHub
- Create a pull request from your branch to `main`
  - Ensure you diligently follow the pull request template

## Project Structure

- `src/app`: Contains pages for the application using the [NextJS App Router](https://nextjs.org/docs/app)
- `src/components`: Contains React components used across the project
  - There should be a folder for each component with an `index.ts` file that exports the component
- `src/server/actions`: Contains functions that interact with the database through the Mongoose ODM
- `src/server/models`: Contains Mongoose models for the database
- `src/services`: Contains functionality for interacting with external data sources (e.g. APIs)
- `src/types`: Contains TypeScript types and interfaces used across the project
- `src/utils`: Contains utility functions used across the project
