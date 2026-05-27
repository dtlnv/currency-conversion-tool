import { useCurrencies } from '@/hooks';
import { renderHook, waitFor } from '@testing-library/react';

const global = globalThis as any;

const mockCurrenciesResponse = [
    { id: 1, short_code: 'USD', name: 'US Dollar' },
    { id: 2, short_code: 'EUR', name: 'Euro' },
];

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ response: mockCurrenciesResponse }),
    });
});

afterEach(() => {
    vi.restoreAllMocks();
});

it('returns mapped currencies', async () => {
    const { result } = renderHook(() => useCurrencies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.currencies).toEqual(mockCurrenciesResponse.map(c => ({ id: c.id, code: c.short_code, name: c.name })));
    expect(result.current.error).toBeNull();
});

it('returns error if API fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Unauthorized',
    });

    const { result } = renderHook(() => useCurrencies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.currencies).toEqual([]);
});
