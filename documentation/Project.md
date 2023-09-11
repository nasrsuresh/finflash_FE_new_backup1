# Project Structure

## public/

- assets/
  - Icons/
    - PaperPlaneRight.svg
    - gpt.png
    - lock-solid.svg
    - note.png
    - search.png
  - Logo/
    - logo.png
- next.svg
- vercel.svg

## src/

- Constants/
  - CompanyOptions.js
  - index.js
- app/

  - context-search/
    - page.js _(Contextual search page)_
  - financials/
    - page.js _(Financials page)_
  - flash-report/
    - page.js _(Flash report page)_
  - globals.css
  - key-negatives/
    - page.js _(Key negatives page)_
  - layout.js
  - page.js _(Main app page)_
  - sec-gpt/
    - page.js _(Secondary GPT page)_
  - components/
    - Buttons/
      - ButtonGroup.js _(Button group for distinguishing 10k/transcript)_
      - PrimaryButton.js _(Base button component)_
    - Cards/
      - DataCard.js _(Used on left when data is selected)_
      - ResearchCard.js _(Used on the homepage)_
      - ResearchSearchCard.js _(Used in research search)_
      - TextCard.js
    - Charts/
      - LineChart.js _(Used in flash-report)_
    - Header.js
    - Inputs/
      - AAPLSearchbar.js _(Search bar for AAPL)_
      - ChatInput.js
      - ResearchSearchbar.js _(Search bar for contextual search)_
      - TextDropdown.js _(Dropdown for company list)_
    - Loader.js
    - Pagination/
      - AAPLFooter.js
    - Sections/
      - Contextual/
        - ContextualHeader.js _(Dropdown for company list and Input for the search query)_
        - DataSelected.js _(Used when a result from any of the api searches is selected)_
        - InitialSearchResult.js _(Sample search result of contextual search)_
        - InputContainer.js 
      - Dashboard/
        - AAPL.js
        - Research.js
        - animation_explanation.gif
      - GPT/
        - Chat.js _(Includes all the components of the chat api)_
      - Reports/
        - ReportContent.js _(includes the otherInfo result, graph and company data)_
        - Sidebar.js _(Sidebar that contains the main document headings)_

- tailwind.config.js _(Style configrations)_
