import type { Money } from "@/lib/commerce/types";

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 0,
  }).format(money.amount);
}

export function formatShowDate(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("es-AR", { day: "2-digit", timeZone: "UTC" }).format(d),
    month: new Intl.DateTimeFormat("es-AR", { month: "short", timeZone: "UTC" })
      .format(d)
      .replace(".", ""),
    year: new Intl.DateTimeFormat("es-AR", { year: "numeric", timeZone: "UTC" }).format(d),
  };
}
