# Flash Report Page Documentation

This documentation provides an overview of the `FlashReport` page component. The `FlashReport` component handles the display of a flash report, including graphs and other relevant data.

## Components Used

- **ButtonGroup**: Represents a group of buttons that allow users to make selections.

- **Header**: Displays the header section of the page.

- **ReportContent**: Displays the content of the report, including graphs and data.

- **Sidebar**: Provides a sidebar section that allows users to select links and make dropdown selections.

## Functions Used

### `formatNumber(number)`

- Description: Formats a given number based on predefined ranges.

### `getStockData(dropdown, period)`

- Description: Fetches stock data based on the provided dropdown selection and period.

## State Variables

- `selectedLink`: Stores the currently selected link.

- `graphData`: Stores graph-related data.

- `companyData`: Stores data related to the company.

- `otherData`: Stores additional data.

- `selectedGraphOption`: Stores the index of the selected graph option.

- `dropdownValue`: Stores the selected value from the dropdown.

- `graphOptions`: Array of available graph options.

- `loading`: Indicates whether loading is in progress.

- `inputValue`: Stores the default input value.

## Effect Hooks

- `useEffect()`: Monitors changes in `selectedGraphOption` and fetches data accordingly.

## Page Structure

The `FlashReport` page consists of the following sections:

1. **Header**: Displays the header section of the page.

2. **Sidebar**: Offers a sidebar for link selection and dropdown input.

3. **ReportContent**: Displays the main content, including graphs and data.

## Data Fetching

The `getStockData` function fetches stock data using the `STOCK_DATA_URL` endpoint. It processes the fetched data and updates the `graphData` state.

## Usage

The `FlashReport` page component renders the page structure and handles the display of graphs and data based on user interactions and fetched data. It integrates various components to provide a comprehensive flash report experience.

# Function: handleDropdown(dropdown)

This function handles the selection of a dropdown option and triggers various data-fetching processes based on the selected option.

## Description

The `handleDropdown` function is called when a dropdown option is selected. It performs the following actions:

1. Resets state variables (`graphData`, `companyData`, `selectedLink`, `otherData`).

2. Calls the `getStockData` function with the selected dropdown value and the current selected graph option to fetch stock data.

3. Initiates data fetching for company-related information from the `COMPANY_DATA_URL` and `COMPANY_OTHER_INFO_URL` endpoints.

4. Processes and formats the fetched company data.

5. Processes and formats other information related to the company.

6. Updates state variables accordingly (`companyData`, `otherData`, `selectedLink`, `loading`).

7. Sets the selected dropdown value in the `dropdownValue` state variable.

## Parameters

- `dropdown`: The selected value from the dropdown.