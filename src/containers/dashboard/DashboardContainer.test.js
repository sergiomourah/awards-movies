import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import DashboardContainer from "./DashboardContainer";
import * as api from "./api/DashboardApi";

jest.mock("react-i18next");
jest.mock("./api/DashboardApi", () => ({
  getListYears: jest.fn(),
  getTopStudios: jest.fn(),
  getIntervalWinsMaxMin: jest.fn(),
  getListWinnersByYear: jest.fn(),
}));

describe("DashboardContainer", () => {
  beforeEach(() => {
    api.getListYears.mockResolvedValue([
      { year: 2000, winnerCount: 2 },
      { year: 2010, winnerCount: 3 },
    ]);

    api.getTopStudios.mockResolvedValue([
      { name: "Studio A", winCount: 5 },
      { name: "Studio B", winCount: 3 },
      { name: "Studio C", winCount: 2 },
    ]);

    api.getIntervalWinsMaxMin.mockResolvedValue({
      max: [
        {
          producer: "Producer A",
          interval: 10,
          previousWin: 2000,
          followingWin: 2010,
        },
      ],
      min: [
        {
          producer: "Producer B",
          interval: 1,
          previousWin: 2018,
          followingWin: 2019,
        },
      ],
    });

    api.getListWinnersByYear.mockResolvedValue([
      { id: 1, year: 2018, title: "Movie A" },
      { id: 2, year: 2018, title: "Movie B" },
    ]);
  });

  it("should render the list of years with multiple winners", async () => {
    render(<DashboardContainer />);

    await act(async () => {
      await api.getListYears();
    });

    const yearElements = screen.getAllByText(/2000|2010|2000|2010/);
    expect(yearElements).toHaveLength(4);
  });

  it("should render the top studios", async () => {
    render(<DashboardContainer />);
    await waitFor(() => expect(api.getTopStudios).toHaveBeenCalled());

    const studioElements = screen.getAllByText(/Studio A|Studio B|Studio C/);
    expect(studioElements).toHaveLength(3);
  });

  it("should render the producers with maximum and minimum intervals", async () => {
    render(<DashboardContainer />);

    await act(async () => {
      await api.getIntervalWinsMaxMin();
    });

    const producerElements = screen.getAllByText(/Producer A|Producer B/);
    expect(producerElements).toHaveLength(2);
  });

  it("should render the winners of the selected year", async () => {
    render(<DashboardContainer />);

    await act(async () => {
      await api.getListWinnersByYear();
    });
    const winnerElements = screen.getAllByText(/Movie A|Movie B/);

    expect(winnerElements).toHaveLength(2);
  });
});
