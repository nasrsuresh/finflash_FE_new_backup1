# File: SecGpt.js

This file contains the implementation of the `SecGpt` component, which integrates with a chat interface and a text dropdown.

## Imports

- `useEffect` and `useState` from React for managing component lifecycle and state.
- `defaultOption`, `freeOptions`, and `options` from `@/Constants/CompanyOptions` for dropdown values and options.
- `Header` component from `@/components/Header` for rendering the header section.
- `TextDropdown` component from `@/components/Inputs/TextDropdown` for displaying the text dropdown input.
- `Chat` component from `@/components/Sections/GPT/Chat` for rendering the chat interface.

## Component: SecGpt

### Description

The `SecGpt` component integrates a chat interface with a text dropdown for user interaction.

### State Variables

- `dropdownValue`: Holds the selected dropdown value.
- `inputValue`: Holds the current input value of the text dropdown.

### useEffect

- Watches changes in the `dropdownValue`.
- Executes the effect when the `dropdownValue` changes.
- Currently empty, placeholder for future functionality.

### Render

Renders the main content of the `SecGpt` component.

- Displays the `Header` component.
- Contains a flex container with centered items.
- Contains a flex column with a text dropdown and a chat interface.

