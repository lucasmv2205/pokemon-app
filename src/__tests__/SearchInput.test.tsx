import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchInput } from "@/components/SearchInput";

jest.useFakeTimers();

describe("SearchInput", () => {
  it("should render the input correctly", () => {
    render(<SearchInput onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText("Search by name...");
    expect(inputElement).toBeInTheDocument();
  });

  it("should update the input value as the user types", () => {
    render(<SearchInput onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText("Search by name...");
    fireEvent.change(inputElement, { target: { value: "Pikachu" } });
    expect(inputElement).toHaveValue("Pikachu");
  });

  it("should call the onSearch function after debounce", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search by name...");

    fireEvent.change(inputElement, { target: { value: "Charizard" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockOnSearch).toHaveBeenCalledWith("Charizard");
  });

  it("should not call onSearch before the debounce time has passed", () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search by name...");

    fireEvent.change(inputElement, { target: { value: "Bulbasaur" } });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(mockOnSearch).not.toHaveBeenCalledWith("Bulbasaur");
  });

  it("should call onSearch only with the final value", () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search by name...");

    fireEvent.change(inputElement, { target: { value: "Charmander" } });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    fireEvent.change(inputElement, { target: { value: "Charmeleon" } });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockOnSearch).toHaveBeenCalledWith("Charmeleon");
  });
});
