import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './Home';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;


describe('Home Component', () => {
  const mockPorts = [
    { _id: '1', name: 'Port A' },
    { _id: '2', name: 'Port B' },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockPorts });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header', () => {
    render(<Home />);
    expect(screen.getByText(/port filter/i)).toBeInTheDocument();
  });

  it('renders loading state', async () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await act(async () => {
      await Promise.resolve(); // Wait for state updates
    });
  });

  it('fetches and displays ports', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Open the dropdown to display ports
    const dropdownButton = screen.getByText(/search ports/i);
    fireEvent.click(dropdownButton);

    expect(await screen.findByText('Port A')).toBeInTheDocument();
    expect(screen.getByText('Port B')).toBeInTheDocument();
  });

  it('handles selecting and removing ports', async () => {
    await act(async () => {
      render(<Home />);
    });
  
    // Open the dropdown
    const dropdownButton = screen.getByText(/search ports/i);
    fireEvent.click(dropdownButton);
  
    // Select Port A
    const portACheckbox = await screen.findByLabelText('Port A');
    fireEvent.click(portACheckbox);
  
    // Verify Port A is selected in the "Selected Ports" section
    const selectedPort = screen.getByText('Port A', { selector: 'span' });
    expect(selectedPort).toBeInTheDocument();
  
    // Remove Port A
    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);
  
    // Verify Port A is removed from the "Selected Ports" section
    expect(screen.queryByText('Port A', { selector: 'span' })).not.toBeInTheDocument();
  });
  
  it('displays an error when fetching ports fails', async () => {
    mockedAxios.get.mockImplementationOnce(() => {
      return Promise.reject(new Error('Network Failure'));
    });
  
    await act(async () => {
      render(<Home />);
    });
  
    // Verify the error message is displayed
    expect(await screen.findByText(/network failure/i)).toBeInTheDocument();
  });
  

  it('changes the language when the language switcher is used', async () => {
    await act(async () => {
      render(<Home />);
    });

    const languageSwitcher = screen.getByDisplayValue('English');
    fireEvent.change(languageSwitcher, { target: { value: 'de' } });

    expect(languageSwitcher).toHaveValue('de');
  });
});
