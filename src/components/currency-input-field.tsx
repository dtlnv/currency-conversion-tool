import { LoaderCircle } from "lucide-react"
import { CurrencySelect } from "./currency-select"
import { Field, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"

interface CurrencyInputFieldProps {
    label: string
    value?: string
    onChange?: (value: string) => void
    currencies: { id: string; code: string; name: string }[]
    currency?: string
    onCurrencyChange?: (currency: string) => void
    disabled?: boolean
    loading?: boolean
}

export function CurrencyInputField({
    label,
    value,
    onChange,
    currencies,
    currency,
    onCurrencyChange,
    disabled,
    loading,
}: CurrencyInputFieldProps) {
    return (
        <Field>
            <FieldLabel className="text-sm font-medium">
                {label}
                {loading && <LoaderCircle className="h-3 w-3 animate-spin" />}
            </FieldLabel>
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2">
                <Input
                    placeholder="0.00"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled || loading}
                    type="number"
                    aria-label={label}
                />
                <CurrencySelect
                    currencies={currencies}
                    currency={currency}
                    onCurrencyChange={onCurrencyChange}
                />
            </div>
        </Field>
    )
}
