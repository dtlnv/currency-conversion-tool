import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { ConversionResponse } from "@/lib/types";
import { CURRENCY_BEACON_API_KEY } from "@/lib/config";

interface UseConverterProps {
  amountFrom: string;
  currencyFrom: string;
  currencyTo: string;
}

/**
 * Converts an amount from one currency to another using the API and manages loading and error states.
 * @param {amountFrom: string, currencyFrom: string, currencyTo: string}
 * @returns {amountTo: number, loading: boolean, error: Error | null}
 */
export function useConverter({
  amountFrom,
  currencyFrom,
  currencyTo,
}: UseConverterProps) {
  const [amountTo, setAmountTo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const parsedAmount = Number(amountFrom);
  const debouncedAmount = useDebounce(parsedAmount);
  const shouldSkipConversion = amountFrom === "" || isNaN(debouncedAmount) || debouncedAmount <= 0; // Skip API call for empty, non-numeric, zero or negative values

  useEffect(() => {
    const controller = new AbortController();

    if (shouldSkipConversion) {
      setAmountTo(0);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(
      `/currency-api/convert?api_key=${CURRENCY_BEACON_API_KEY}&from=${currencyFrom}&to=${currencyTo}&amount=${debouncedAmount}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText || "Failed to convert currency")
        }

        return res.json();
      })
      .then((data: ConversionResponse) => {
        !controller.signal.aborted && setAmountTo(parseFloat(data.value.toFixed(2)))
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }

        !controller.signal.aborted && setError(e)
      })
      .finally(() => !controller.signal.aborted && setLoading(false))

    return () => {
      controller.abort();
    }
  }, [debouncedAmount, currencyFrom, currencyTo, shouldSkipConversion]);

  useEffect(() => {
    setError((debouncedAmount < 0) ? new Error("Amount cannot be negative") : null);
  }, [debouncedAmount]);

  return { loading, error, amountTo: shouldSkipConversion ? 0 : amountTo };
}
