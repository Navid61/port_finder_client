// src/__tests__/ErrorBoundary.test.tsx
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../utils/ErrorBoundary";

const ThrowError = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary Component", () => {
  // Suppress console errors for this test
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("renders fallback UI when an error is thrown", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(
      screen.getByText("We encountered an unexpected error. Please try refreshing the page.")
    ).toBeInTheDocument();
  });
});
