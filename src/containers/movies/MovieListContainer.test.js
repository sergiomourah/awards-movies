import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MoviesListContainer from "./MoviesListContainer";
import { getListMovies } from "./api/MoviesApi";

jest.mock("./api/MoviesApi");

const mockData = {
  data: {
    content: [
      { id: 1, year: 2000, title: "Movie Title 1", winner: true },
      { id: 2, year: 2001, title: "Movie Title 2", winner: false },
    ],
    totalElements: 2,
  },
};

describe("MoviesListContainer", () => {
  beforeEach(() => {
    getListMovies.mockResolvedValue(mockData);
  });

  test("renders without crashing", () => {
    render(<MoviesListContainer />);
    expect(screen.getByText(/dashboard.listMovies.title/i)).toBeInTheDocument();
  });

  test("fetches and displays movies", async () => {
    render(<MoviesListContainer />);

    await waitFor(() => {
      expect(screen.getByText("Movie Title 1")).toBeInTheDocument();
      expect(screen.getByText("Movie Title 2")).toBeInTheDocument();
    });
  });

  test("filters movies by year", async () => {
    render(<MoviesListContainer />);

    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: "2000" },
    });

    await waitFor(() => {
      expect(screen.getByText("Movie Title 1")).toBeInTheDocument();
      expect(screen.queryByText("Movie Title 2")).not.toBeInTheDocument();
    });
  });

  test("filters movies by winner", async () => {
    render(<MoviesListContainer />);

    fireEvent.change(screen.getByLabelText(/winner/i), {
      target: { value: "true" },
    });

    await waitFor(() => {
      expect(screen.getByText("Movie Title 1")).toBeInTheDocument();
      expect(screen.queryByText("Movie Title 2")).not.toBeInTheDocument();
    });
  });
});
