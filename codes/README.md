# Introduction

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with template `choffee`.

Install `typescript` by default.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Launch the app locally.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run deploy`

Deploy the app to the repository as GitHub Pages.

## Components Import Path

Use `@Components/path/to/the/component` to import any component from anywhere.\

```ts
// src/index.tsx
import App from '@Components/App';
import ErrorBoundary from '@Components/Common/ErrorBoundary';
```

## Folder Structure

```
config/
  jest/
  webpack/
  alias.js
  env.js
  getHttpsConfig.js
  modules.js
  path.js
  webpack.config.js
  webpackDevServer.config.js
public/
  index.html
  robots.txt
scripts/
  build.js
  start.js
  test.js
src/
  components/
    App/
      index.tsx
    Common/
      ErrorBoundary/
        index.tsx
        types.d.ts
  index.css
  index.tsx
  react-app.env.d.ts
  reportWebVitals.ts
.gitignore
package.json
README.md
tsconfig.json
tsconfig.path.json
```

## Author

Charlie (Tzu Yin)\
[Blog](https://tzynwang.github.io/) | [GitHub](https://github.com/tzynwang)
