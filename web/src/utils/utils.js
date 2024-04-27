export function prettyCost(cents) {
  if (typeof cents !== "number") {
    return "0,00 €";
  }

  return `${(cents / 100).toFixed(2)} €`.replace(".", ",");
}
