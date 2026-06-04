# Currency Converter Tool

Demo: https://currency-conversion-tool-dt.vercel.app/

This is a simple currency converter tool.

Technologies used:
- React with TypeScript
- Vite for bundling
- Tailwind CSS (Shadcn/ui) for styling

## Project Requirements

### Currency Selection:
1. Provide two select boxes for users to choose a currency to convert from and to.
2. Fetch a list of currencies from the https://api.currencybeacon.com/v1/currencies API.
3. Populate the select boxes with the available options returned from the API.

### Currency Conversion:
1. Allow users to input an amount for the “from” currency.
2. Fetch the converted value from the https://api.currencybeacon.com/v1/convert API.
3. Populate the “to” value based on the value returned from the API.

## Running the Application

- Clone the repository.
- Install dependencies using `npm install`.
- Provide your Currency Beacon API key in the `.env` file.
- Start the development server using `npm run dev`.
- Open `http://localhost:5174/` in your browser.

## Testing
- To run tests, run `npm run test`.

## Project Structure

- `src/`
    - `components/`: Contains reusable components of the application.
        - `ui/`: Contains Shadcn/ui shared UI components.
    - `hooks/`: Contains custom React hooks.
    - `lib/`: Contains configs and type definitions.
    - `tests/`: Test configuration.
    - `App.tsx`: The main application component.
    - `index.tsx`: The entry point of the application.
    - `index.css`: Global styles for the application (includes Shadcn/ui configuration).

## Notes and assumptions
- API key is stored in an environment variable and accessed via `import.meta.env.VITE_CURRENCY_BEACON_API_KEY`.
- The UI is kept simple and functional, focusing on the core requirements of currency selection and conversion.
- Error handling is implemented to display any issues that arise during API calls.
- Default currencies: USD (from) and EUR (to).
- Default amount: 1000 in the "from" currency.
- To avoid overengineering, I didn't use React Queries or any state management library, as the application is simple enough to manage state with React's built-in hooks.



# New Task

## Overview

**As a user** of the UI currency conversion app  
**I want** to be able to view a list of my last 5 currency conversions  
**So that** I can quickly reference recent conversions without having to redo them.

## Acceptance Criteria

The list should show a maximum of 5 most recent currency conversions.
New conversions should be added to the top of the list.
If the list already contains 5 conversions, the oldest conversion should be removed from the bottom of the list to make space for the new one.


## Non-Functional Requirements

### Usability

The list of conversions should be easily accessible from the main screen.
Entries should be displayed in a clear and readable format.
The from, to, amount to convert, and the API-derived conversion value should all be present.

## Scalability

Although the current requirement is to store only the last 5 conversions, the design should be flexible enough to allow easy adjustments to this number in the future if needed.