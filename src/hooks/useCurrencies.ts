import { currencyApi } from "@/lib/currency-api";
import type { CurrenciesResponse, Currency } from "@/lib/types";
import { useEffect, useState } from "react";

/**
 * Gets the list of available currencies from the API and manages loading and error states.
 * @returns {currencies: Currency[], loading: boolean, error: Error | null}
 */
export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await currencyApi(`/currencies`);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();

        setCurrencies(
          data.response.map((c: CurrenciesResponse) => ({
            id: c.id,
            code: c.short_code,
            name: c.name,
          }))
        )
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  return { currencies, loading, error };
}
