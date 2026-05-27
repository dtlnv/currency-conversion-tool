import { useConverter } from '@/hooks';
import { renderHook, waitFor } from '@testing-library/react';

const global = globalThis as any;

const mockConverterResponse = {
    "timestamp": 1779891264,
    "date": "2026-05-27",
    "from": "USD",
    "to": "EUR",
    "amount": 1000,
    "value": 858.7844100000001
};

const defaultProps = {
    amountFrom: "1000",
    currencyFrom: "USD",
    currencyTo: "EUR",
};

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockConverterResponse),
    });
});

afterEach(() => {
    vi.restoreAllMocks();
});

it('returns converted value', async () => {
    const { result } = renderHook(() => useConverter(defaultProps));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.amountTo).toBe(Number(mockConverterResponse.value.toFixed(2)));
    expect(result.current.error).toBeNull();
});

it('returns error if API fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Unauthorized',
    });

    const { result } = renderHook(() => useConverter(defaultProps));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.amountTo).toBe(0);
});

it('returns error for negative amount', async () => {
    const { result } = renderHook(() => useConverter({ ...defaultProps, amountFrom: "-100" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Amount cannot be negative");
    expect(result.current.amountTo).toBe(0);
});

it('returns 0 for empty amount', async () => {
    const { result } = renderHook(() => useConverter({ ...defaultProps, amountFrom: "" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.amountTo).toBe(0);
});