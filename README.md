# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
```text
1. Set Up the Project
Goal: Create a clean and functional environment to build your app.

Task: Create a new Vite project with React and TypeScript.
Use the command: npm create vite@latest project-name --template react-ts.
Description: This initializes your project with Vite and sets it up for React development using TypeScript.

2. Install Required Libraries
Goal: Add React-Bootstrap for UI components and Bootstrap for styling.

Task: Install dependencies using npm install react-bootstrap bootstrap.
Description: React-Bootstrap provides pre-styled components, and Bootstrap offers global CSS styles.

 Configure Bootstrap in the Project
Goal: Ensure Bootstrap styles are applied globally.

Task: Import Bootstrap CSS in main.tsx.
Add import "bootstrap/dist/css/bootstrap.min.css"; in the file.
Description: This makes sure all components use consistent styles provided by Bootstrap.

4. Design the UI (Frontend Development)
Goal: Create a user-friendly interface for port selection and filtering.

Task: Create a PortFilter.tsx component with these features:
A search box to filter ports by name.
A dropdown menu to display available ports.
A list to show selected ports.
Buttons to remove selected ports.
Description: This forms the core of the frontend, allowing users to interact with the port filter functionality.

5. Update the Main App
Goal: Integrate the PortFilter component into the main application.

Task: Replace the content of App.tsx to render PortFilter.
Description: This ensures the PortFilter component is the main feature of your app.

6. Run and Test the Application
Goal: Verify the app works as expected.

Task: Run npm run dev and test in the browser.
Try searching for ports, selecting ports, and removing them.
Description: Ensures all UI functionality is working correctly and smoothly.