import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import MoviesListContainer from "./MoviesListContainer";
import { getListMovies } from "./api/MoviesApi";

jest.mock("react-i18next");
jest.mock("./api/MoviesApi", () => ({
  getListMovies: jest.fn(),
}));

const mockData = {
  content: [
    { id: 1, year: 2000, title: "Movie Title 1", winner: true },
    { id: 2, year: 2001, title: "Movie Title 2", winner: false },
  ],
  totalElements: 2,
};

describe("MoviesListContainer", () => {
  beforeEach(() => {
    getListMovies.mockResolvedValue(mockData);
  });

  test("renders without crashing", async () => {
    render(<MoviesListContainer />);
    await act(async () => {
      await getListMovies;
    });
    expect(screen.getByText(/dashboard.listMovies.title/i)).toBeInTheDocument();
  });

  test("fetches and displays movies", async () => {
    render(<MoviesListContainer />);

    expect(await screen.findByText("Movie Title 1")).toBeInTheDocument();
    expect(await screen.findByText("Movie Title 2")).toBeInTheDocument();
  });

  test("filters movies by year", async () => {
    render(<MoviesListContainer />);

    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: "2000" },
    });

    expect(await screen.findByText("Movie Title 1")).toBeInTheDocument();
    expect(screen.queryByText("Movie Title 2")).not.toBeInTheDocument();
  });

  test("filters movies by winner", async () => {
    render(<MoviesListContainer />);

    fireEvent.change(screen.getByLabelText(/winner/i), {
      target: { value: "true" },
    });

    expect(await screen.findByText("Movie Title 1")).toBeInTheDocument();
    expect(screen.queryByText("Movie Title 2")).not.toBeInTheDocument();
  });
});
