import { CURRENCY_BEACON_API_KEY } from "./config";

const metadata = {
    headers: {
        "Authorization": `Bearer ${CURRENCY_BEACON_API_KEY}`
    }
}

/**
 * uri - is a part of Currency Beacon API URL
 * https://api.currencybeacon.com/v1/*uri*
 */
export function currencyApi(uri: string, data?: Object) {
    return fetch(`/currency-api${uri}`, { ...metadata, ...data });
}
