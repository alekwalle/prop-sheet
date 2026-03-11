const currencyFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0
});

const percentFormatter = new Intl.NumberFormat("nb-NO", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1
});

export const formatCurrency = (value: number) => currencyFormatter.format(value || 0);
export const formatPercent = (value: number) => percentFormatter.format(value || 0);
export const formatCompact = (value: number) => compactFormatter.format(value || 0);
export const formatNumber = (value: number, digits = 0) =>
  (value || 0).toLocaleString("en-US", { maximumFractionDigits: digits });
