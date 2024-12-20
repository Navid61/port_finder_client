import { render } from "@testing-library/react";
import App from "./App";
import { act } from "@testing-library/react";

describe("Renders App", () => {
  it("Render App", async () => {
    await act(async () => {
      render(<App />);
      // Perform actions that trigger suspense resolution
    });
  });
});
