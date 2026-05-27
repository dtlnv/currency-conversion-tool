import { CURRENCY_BEACON_API_KEY } from "@/lib/config";
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
    fetch(`/currency-api/currencies?api_key=${CURRENCY_BEACON_API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((data) =>
        setCurrencies(
          data.response.map((c: CurrenciesResponse) => ({
            id: c.id,
            code: c.short_code,
            name: c.name,
          }))
        )
      )
      .catch(setError)
      .finally(() => setLoading(false))
  }, []);

  return { currencies, loading, error };
}
