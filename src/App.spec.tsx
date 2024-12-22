import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", async () => {
    // Render the App component
    render(<App />);

    // Check if the fallback UI (Suspense) is displayed initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy-loaded Home component to load and verify the content
    const header = await screen.findByText("Port Finder Application");
    expect(header).toBeInTheDocument();
  });
});
