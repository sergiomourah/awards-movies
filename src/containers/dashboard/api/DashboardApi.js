import axios from "axios";

export const getListYears = async () => {
  const endpoint = "/?projection=years-with-multiple-winners";
  const result = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
  return (result.data.years ?? []).map(({ year, winnerCount }) => ({
    year,
    winnerCount,
  }));
};

export const getTopStudios = async () => {
  const endpoint = "/?projection=studios-with-win-count";
  const result = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
  return (result.data.studios ?? [])
    .sort((a, b) => b.winCount - a.winCount)
    .slice(0, 3)
    .map(({ name, winCount }) => ({ name, winCount }));
};

export const getIntervalWinsMaxMin = async () => {
  const endpoint = "/?projection=max-min-win-interval-for-producers";
  const result = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
  return result.data;
};

export const getListWinnersByYear = async (searchYear) => {
  const endpoint = `/?winner=true&year=${searchYear}`;
  const result = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
  return (result.data ?? []).map(({ id, year, title }) => ({
    id,
    year,
    title,
  }));
};
