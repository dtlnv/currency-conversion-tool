import { useState } from "react";
import { CurrencyInputField } from "./components/currency-input-field";
import { DEFAULT_CURRENCY_FROM, DEFAULT_CURRENCY_TO } from "./lib/config";
import { Button } from "./components/ui/button";
import { ArrowDownUp, LoaderCircle } from "lucide-react";
import { useConverter, useCurrencies } from "./hooks";

export function App() {
  const [currencyFrom, setCurrencyFrom] = useState<string>(DEFAULT_CURRENCY_FROM);
  const [currencyTo, setCurrencyTo] = useState<string>(DEFAULT_CURRENCY_TO);
  const [amountFrom, setAmountFrom] = useState<string>("1000");
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencies();
  const { amountTo, loading: conversionLoading, error: conversionError } = useConverter({ amountFrom, currencyFrom, currencyTo });

  const onAmountFromChange = (value: string) => {
    if (value !== "" && isNaN(Number(value))) {
      return; // Prevent non-numeric input
    }

    setAmountFrom(value);
  };

  const onSwapCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  if (currenciesLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center gap-4 p-6">
        <LoaderCircle className="animate-spin" /> Loading currencies...
      </div>
    )
  }

  if (currenciesError) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="text-red-500">
          Error loading currencies: {currenciesError.message || "Unknown error"}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="mb-10 text-2xl font-bold">Currency Converter - {currencyFrom} to {currencyTo}</h1>

          <div className="flex min-w-[300px] flex-col gap-4">
            <CurrencyInputField
              label={`Amount`}
              value={amountFrom.toString()}
              onChange={onAmountFromChange}
              currencies={currencies}
              currency={currencyFrom}
              onCurrencyChange={setCurrencyFrom}
            />
            <Button className="self-center" onClick={onSwapCurrencies} disabled={conversionLoading}>
              <ArrowDownUp />
            </Button>
            <CurrencyInputField
              label={`Converted to`}
              value={amountTo != null ? String(amountTo) : ""}
              currencies={currencies}
              currency={currencyTo}
              onCurrencyChange={setCurrencyTo}
              disabled
              loading={conversionLoading}
            />

            {conversionError && (
              <div className="flex items-center justify-center p-6">
                <div className="text-red-500">
                  Error converting currency: {(conversionError as Error)?.message || "Unknown error"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
