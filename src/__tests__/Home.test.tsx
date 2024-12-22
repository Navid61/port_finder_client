// src/__tests__/Home.test.tsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";
import Home from "@/Pages/Home";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18nForTests";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPorts = [
  { _id: "1", name: "Port 1" },
  { _id: "2", name: "Port 2" },
  { _id: "3", name: "Port 3" },
];

mockedAxios.get.mockImplementation((url) => {
  if (url === "http://localhost:5000/ports") {
    return Promise.resolve({ data: mockPorts });
  }
  return Promise.reject(new Error("Network Error"));
});

function renderWithI18n(ui: React.ReactNode) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
}

describe("Home Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore original behavior
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = renderWithI18n(<Home />);
    expect(getByText("Search and Select Ports")).toBeInTheDocument();
  });

  it("fetches and displays ports", async () => {
    renderWithI18n(<Home />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    fireEvent.click(screen.getByText(/Type to search ports.../i));

    await waitFor(() => {
      expect(screen.getByText("Port 1")).toBeInTheDocument();
      expect(screen.getByText("Port 2")).toBeInTheDocument();
      expect(screen.getByText("Port 3")).toBeInTheDocument();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:5000/ports");
  });

  it("handles API errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    renderWithI18n(<Home />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/Network failure! Please try again./i)
      ).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("selects and deselects ports", async () => {
    renderWithI18n(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    fireEvent.click(screen.getByText(/Type to search ports.../i));

    await waitFor(() => {
      expect(screen.getByText("Port 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Port 1"));

    const selectedPort = screen.getByText("Port 1", { selector: "span" });
    expect(selectedPort).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Port 1"));
    expect(
      screen.queryByText("Port 1", { selector: "span" })
    ).not.toBeInTheDocument();
  });

  it("handles language switching", async () => {
    renderWithI18n(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const languageSwitcher = screen.getByRole("combobox");
    fireEvent.change(languageSwitcher, { target: { value: "de" } });

    await waitFor(() => {
      expect(
        screen.getByText(/Häfen suchen und auswählen/i)
      ).toBeInTheDocument();
    });

    fireEvent.change(languageSwitcher, { target: { value: "en" } });

    await waitFor(() => {
      expect(screen.getByText(/Search and Select Ports/i)).toBeInTheDocument();
    });
  });
});
