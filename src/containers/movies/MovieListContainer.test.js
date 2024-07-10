import React from "react";
import {
  waitFor,
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
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
    cleanup(); // Limpa o DOM após cada teste
  });

  // it("renders without crashing", async () => {
  //   render(<MoviesListContainer />);
  //   await act(async () => {
  //     await api.getListMovies(0, true, 2024);
  //   });
  //   const titleElements = screen.getAllByText(/Movie Title 1|Movie Title 2/);

  //   expect(titleElements).toHaveLength(2);
  // });

  it("fetches and displays movies", async () => {
    render(<MoviesListContainer />);
    await act(async () => {
      await api.getListMovies();
    });
    //await waitFor(() => expect(api.getListMovies).toHaveBeenCalled());

    const titleElements = screen.getAllByText(/Movie Title 1|Movie Title 2/);

    expect(titleElements).toHaveLength(2);
  });

  // it("filters movies by year", async () => {
  //   render(<MoviesListContainer />);

  //   fireEvent.change(screen.getByLabelText(/year/i), {
  //     target: { value: "2000" },
  //   });

  //   expect(await screen.findByText("Movie Title 1")).toBeInTheDocument();
  //   expect(screen.queryByText("Movie Title 2")).not.toBeInTheDocument();
  // });

  // it("filters movies by winner", async () => {
  //   render(<MoviesListContainer />);

  //   fireEvent.change(screen.getByLabelText(/winner/i), {
  //     target: { value: "true" },
  //   });

  //   expect(await screen.findByText("Movie Title 1")).toBeInTheDocument();
  //   expect(screen.queryByText("Movie Title 2")).not.toBeInTheDocument();
  // });
});
