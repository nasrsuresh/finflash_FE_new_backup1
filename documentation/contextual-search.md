# Contextual Search Page Documentation

This documentation provides an overview of the `ContextualSearch` page component. The `ContextualSearch` component is responsible for displaying contextual search results and allowing users to interact with search inputs and data selections.

## Components Used

### Header

The `Header` component displays the header section of the page, which might include navigation links or branding elements.

### ContextualHeader

The `ContextualHeader` component handles the contextual search input and dropdown. It allows users to input search terms, select dropdown options, and trigger searches.

### ButtonGroup

The `ButtonGroup` component displays a group of buttons, enabling users to choose between different options, such as "10k" or "Transcripts".

### InitialSearchResult

The `InitialSearchResult` component displays the initial search results when data is not yet selected. It shows a list of search results and allows users to select a result for more details.

### DataSelected

The `DataSelected` component presents detailed information about selected search data. It displays the selected data's source name, content, and other relevant details.

## State Variables

- `searchData`: Stores search results data.
- `showDetailsCard`: Controls whether the details card is displayed.
- `dataSelected`: Indicates whether data is selected.
- `sourceName`: Stores the name of the selected data's source.
- `selectedButton`: Tracks the currently selected button (e.g., "10k" or "Transcripts").
- `searchTerm`: Stores the current search term input.
- `dropdownTerm`: Stores the current dropdown selection.
- `fullDoc`: Stores the full document content.
- `searchInputText`: Stores the text entered in the search input.
- `dropdownInputText`: Stores the text entered in the dropdown input.
- `loading`: Indicates if loading is in progress.
- `inputValue`: Stores the current dropdown input value.

# Explanation of `handleSearch` Function

The `handleSearch` function in the `ContextualSearch` page component manages search operations and state updates based on user input.

1. The function sets the loading state to `true` and clears the `fullDoc` state.

2. It validates the provided `dropdown` input against valid options and checks if the `search` and `dropdown` strings have a length of at least 3 characters. If not, an alert is shown, and the function returns.

3. The function updates the `dropdownTerm` and `searchTerm` states with the provided values.

4. The last part of the comma-separated `dropdown` string is extracted.

5. Based on the selected button (`selectedButton`), the function performs different data fetching and processing operations.

   - If the selected button is the first button (`buttons[0]`), it fetches an index key using `SET_INDEX_KEY_URL`. It then fetches search results using `SEARCH_URL` and updates the search data.

   - If the selected button is the second button, it fetches an index key using `SET_INDEX_KEY_URL_CONCALL`. It then fetches data using different endpoints (`GET_ALL_SENTENCES_URL_CONCALL` and `SEARCH_URL_CONCALL`), processing and updating the data.

6. After fetching and processing the data, the loading state is set to `false`.

This function handles various data fetching scenarios based on the selected button and input values. It updates the relevant states to display search results and detailed data based on the user's choices.
