import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardContainer from "./DashboardContainer";
import * as api from "./api/DashboardApi"; // Importe a API para mocká-la

// Mock das funções da API
jest.mock("./api/DashboardApi", () => ({
  getListYears: jest.fn(),
  getTopStudios: jest.fn(),
  getIntervalWinsMaxMin: jest.fn(),
  getListWinnersByYear: jest.fn(),
}));

describe("DashboardContainer", () => {
  beforeEach(() => {
    // Configurar mock return values
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
    await waitFor(() => expect(api.getListYears).toHaveBeenCalled());

    const yearElements = screen.getAllByText(/2000|2010/);
    expect(yearElements).toHaveLength(2);
  });

  it("should render the top studios", async () => {
    render(<DashboardContainer />);
    await waitFor(() => expect(api.getTopStudios).toHaveBeenCalled());

    const studioElements = screen.getAllByText(/Studio A|Studio B|Studio C/);
    expect(studioElements).toHaveLength(3);
  });

  it("should render the producers with maximum and minimum intervals", async () => {
    render(<DashboardContainer />);
    await waitFor(() => expect(api.getIntervalWinsMaxMin).toHaveBeenCalled());

    const maxIntervalProducer = screen.getByText("Producer A");
    const minIntervalProducer = screen.getByText("Producer B");

    expect(maxIntervalProducer).toBeInTheDocument();
    expect(minIntervalProducer).toBeInTheDocument();
  });

  it("should render the winners of the selected year", async () => {
    render(<DashboardContainer />);
    await waitFor(() => expect(api.getListWinnersByYear).toHaveBeenCalled());

    const isWinnerText = (content, element) => {
      return (
        element.tagName.toLowerCase() === "td" &&
        /Movie A|Movie B/.test(content)
      );
    };

    const winnerElements = screen.getAllByText(isWinnerText);

    expect(winnerElements).toHaveLength(2);
  });
});
