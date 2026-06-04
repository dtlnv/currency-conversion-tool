import { useState } from "react";
import { CurrencyInputField } from "./components/currency-input-field";
import { DEFAULT_CURRENCY_FROM, DEFAULT_CURRENCY_TO } from "./lib/config";
import { Button } from "./components/ui/button";
import { ArrowDownUp, LoaderCircle } from "lucide-react";
import { useConverter, useCurrencies } from "./hooks";
import { LatestHistory } from "./components/latest-history";

export function App() {
  const [currencyFrom, setCurrencyFrom] = useState<string>(DEFAULT_CURRENCY_FROM);
  const [currencyTo, setCurrencyTo] = useState<string>(DEFAULT_CURRENCY_TO);
  const [amountFrom, setAmountFrom] = useState<string>("1000");
  const [amountTo, setAmountTo] = useState<string>("1000");
  const [direction, setDirection] = useState<"from" | "to">("from");

  const currenciesState = useCurrencies();
  const { amountTo: convertedAmount, loading: conversionLoading, error: conversionError, history } = useConverter({
    amountFrom: direction === "from" ? amountFrom : amountTo,
    currencyFrom: direction === "from" ? currencyFrom : currencyTo,
    currencyTo: direction === "from" ? currencyTo : currencyFrom,
  });

  const onAmountFromChange = (value: string) => {
    setDirection('from');
    setAmountFrom(value);
  };

  const onAmountToChange = (value: string) => {
    setDirection('to');
    setAmountTo(value);
  }

  const onSwapCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  const displayFrom = direction === "from"
    ? amountFrom
    : String(convertedAmount ?? "");

  const displayTo = direction === "to"
    ? amountTo
    : String(convertedAmount ?? "");


  if (currenciesState.status === 'loading') {
    return (
      <div className="flex min-h-svh items-center justify-center gap-4 p-6">
        <LoaderCircle className="animate-spin" /> Loading currencies...
      </div>
    )
  }

  if (currenciesState.status === 'error') {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="text-red-500">
          Error loading currencies: {currenciesState.error.message || "Unknown error"}
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
              value={displayFrom.toString()}
              onChange={onAmountFromChange}
              currencies={currenciesState.status === 'success' ? currenciesState.data : []}
              currency={currencyFrom}
              onCurrencyChange={setCurrencyFrom}
              loading={direction === "to" && conversionLoading}
            />
            <Button className="self-center" onClick={onSwapCurrencies} disabled={conversionLoading}>
              <ArrowDownUp />
            </Button>
            <CurrencyInputField
              label={`Converted to`}
              value={displayTo.toString()}
              onChange={onAmountToChange}
              currencies={currenciesState.status === 'success' ? currenciesState.data : []}
              currency={currencyTo}
              onCurrencyChange={setCurrencyTo}
              loading={direction === "from" && conversionLoading}
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

        <LatestHistory history={history} />
      </div>
    </div>
  )
}
