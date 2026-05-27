# Currency Converter Tool

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

## Project Structure

- `src/`
    - `components/`: Contains reusable components of the application.
        - `ui/`: Contains Shadcn/ui shared UI components.
    - `hooks/`: Contains custom React hooks.
    - `lib/`: Contains configs and type definitions.
    - `App.tsx`: The main application component.
    - `index.tsx`: The entry point of the application.
    - `index.css`: Global styles for the application (includes Shadcn/ui configuration).