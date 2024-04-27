import { test, describe, expect } from "vitest";
import { prettyCost } from "./utils";

// TDD Test Driven Development

describe("prettyCost", () => {
  test("happy case", () => {
    // Given
    const qty = 234;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("2,34 €");
  });

  test("wrong input: string", () => {
    // Given
    const qty = "1200";

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("0,00 €");
  });

  test("wrong input: undefined", () => {
    // Given
    const qty = undefined;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("0,00 €");
  });

  test("wrong input: true", () => {
    // Given
    const qty = true;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("0,00 €");
  });

  test("int number", () => {
    // Given
    const qty = 1200;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("12,00 €");
  });

  test("0", () => {
    // Given
    const qty = 0;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("0,00 €");
  });
});
