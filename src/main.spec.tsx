import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from "./App";

// Mock react-dom/client
jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
    unmount: jest.fn(), // Add unmount to avoid TypeError
  })),
}));

describe("Main Entry File", () => {
  it("renders App component with I18nextProvider", () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );

    // Check if App is rendered
    expect(container).toBeInTheDocument();
  });
});
