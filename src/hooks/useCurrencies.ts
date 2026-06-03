import { currencyApi } from "@/lib/currency-api";
import type { CurrenciesResponse, Currency } from "@/lib/types";
import { useEffect, useState } from "react";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success", data: Currency[] }
  | { status: "error", error: Error }

/**
 * Gets the list of available currencies from the API and manages loading and error states.
 * @returns {currencies: Currency[], loading: boolean, error: Error | null}
 */
export function useCurrencies() {
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    setState({ status: "loading" });

    const run = async () => {
      try {
        const res = await currencyApi(`/currencies`);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();

        setState({
          status: "success",
          data: data.response.map((c: CurrenciesResponse) => ({
            id: c.id,
            code: c.short_code,
            name: c.name,
          }))
        })
      } catch (e) {
        setState({
          status: "error",
          error: e instanceof Error ? e : new Error(String(e))
        })
      }
    }

    run();
  }, []);

  return state;
}
