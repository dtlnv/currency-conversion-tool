import type { Currency } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface CurrencySelectProps {
  currencies: Currency[]
  currency?: string
  onCurrencyChange?: (currency: string) => void
}

export function CurrencySelect({
  currencies,
  currency,
  onCurrencyChange,
}: CurrencySelectProps) {
  return (
    <Select value={currency} onValueChange={onCurrencyChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currencies.map((c: Currency) => (
            <SelectItem key={c.id} value={c.code}>
              {c.code} - {c.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
