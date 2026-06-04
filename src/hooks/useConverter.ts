import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { ConversionResponse, History } from "@/lib/types";
import { currencyApi } from "@/lib/currency-api";
import { MAX_HISTORY_CAPACITY } from "@/lib/config";

interface UseConverterProps {
  amountFrom: string; // AmountFrom is string because it's bound to an input field.
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
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [history, setHistory] = useState<History[]>([]);

  const parsedAmount = Number(amountFrom);
  const debouncedAmount = useDebounce(parsedAmount);
  const shouldSkipConversion = amountFrom === "" || isNaN(debouncedAmount) || debouncedAmount <= 0;
  const negativeError = debouncedAmount < 0 ? new Error("Amount cannot be negative") : null;

  useEffect(() => {
    if (shouldSkipConversion) return;

    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const res = await currencyApi(
          `/convert?from=${currencyFrom}&to=${currencyTo}&amount=${debouncedAmount}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(res.statusText || "Failed to convert currency");
        }

        const data: ConversionResponse = await res.json();
        const amountTo = parseFloat(data.value.toFixed(2));
        setAmountTo(amountTo);

        setHistory((prev: History[]) => {
          return [
            {
              currencyFrom,
              currencyTo,
              amountFrom: String(debouncedAmount),
              amountTo: String(amountTo),
            },
            ...prev
          ].slice(0, MAX_HISTORY_CAPACITY);
        });

      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }
        setFetchError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    }
  }, [debouncedAmount, currencyFrom, currencyTo]);

  return {
    loading,
    error: negativeError ?? fetchError,
    amountTo: shouldSkipConversion ? 0 : amountTo,
    history,
  };
}