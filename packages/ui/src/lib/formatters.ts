/**
 * Shared Intl formatters to avoid expensive re-instantiation.
 * Instantiating Intl formatters can be 10-100x slower than the formatting itself.
 */

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/**
 * A helper to format numbers as USD currency
 */
export const formatCurrency = (value: number) =>
  currencyFormatter.format(value);

/**
 * A helper to format dates in a standard short format
 */
export const formatDate = (date: Date) => dateFormatter.format(date);
