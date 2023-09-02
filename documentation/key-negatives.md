## React Component: KeyNegatives

This component represents a user interface for searching and displaying key negative statements from transcripts or 10K reports.

### State

- `dropdownValue`: A string representing the selected value from the dropdown.
- `dropdownTerm`: A string representing the term used for the search.
- `searchData`: An array representing the search results.
- `dataSelected`: A boolean indicating whether data has been selected.
- `fullDoc`: A string representing the full document content.
- `sourceName`: A string representing the name of the data source.
- `loading`: A boolean indicating whether data is being loaded.
- `showDetailsCard`: A boolean indicating whether to show the details card.
- `inputValue`: A string representing the input value in the text dropdown.
- `selectedButton`: A string representing the selected button value.

### Description

This component handles the search and display of key negative statements from transcripts or 10K reports. It includes a dropdown for selecting options, buttons for choosing the type of data to search, and displays the search results or initial input container.

The component performs the following actions:

1. Sets up the initial state.
2. Checks for back button press and updates the state accordingly.
3. Renders the UI elements based on the current state.
4. Handles text dropdown selection and button selection.
5. Displays either the search results or the input container based on data availability.
6. Displays loading indicator if data is being fetched.


## Function: handleSearch(dropdownValue, selectedButton)

This function is responsible for handling the search action when a dropdown value and a selected button are provided.

### Parameters

- `dropdownValue`: A string representing the selected value from the dropdown.
- `selectedButton`: A string representing the selected button value.

### Description

This function processes the search action based on the provided dropdown value and selected button. It validates the input, fetches data from the server, and updates the component state accordingly.

- If the `dropdownValue` is insufficient or invalid, the function logs an error message.
- If the `selectedButton` is the first button, it fetches and processes negative concall data.
- If the `selectedButton` is not the first button, it fetches and processes 10K data.

The function performs the following steps:

1. Initializes the document details.
2. Validates the input data and checks if it meets the requirements.
3. If the input data is valid, it extracts the dropdown value.
4. If the selected button is the first button:
   - Clears previous document data.
   - Sets loading state to true.
   - Sets the dropdown term and source name.
   - Fetches negative concall data.
   - Processes and sets the data for consecutive sentences.
   - Fetches all sentences related to the concall.
   - Processes and sets the full document data.
5. If the selected button is not the first button:
   - Fetches 10K HTML content.
   - Processes and sets the source name and full document data.
   - Fetches and processes negative 10K data.