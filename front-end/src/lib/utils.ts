import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function abbreviateNumber(value: number) {
  const suffixes = ["", "K", "M", "B", "T"]
  const suffixNum = Math.floor(("" + value).length / 3)
  let shortValue: any = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  )
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1)
  }
  return shortValue + suffixes[suffixNum]
}
