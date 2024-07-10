import React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import MoviesListContainer from "./MoviesListContainer";
import * as api from "./api/MoviesApi";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock("./api/MoviesApi", () => ({
  getListMovies: jest.fn(),
}));

describe("MoviesListContainer", () => {
  beforeEach(() => {
    api.getListMovies.mockResolvedValue({
      data: {
        content: [
          { id: 1, year: 2023, title: "Movie Title 1", winner: true },
          { id: 2, year: 2024, title: "Movie Title 2", winner: false },
        ],
        totalElements: 2,
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("fetches and displays movies", async () => {
    render(<MoviesListContainer />);
    await act(async () => {
      await api.getListMovies();
    });

    const titleElements = screen.getAllByText(/Movie Title 1|Movie Title 2/);

    expect(titleElements).toHaveLength(2);
  });
});
