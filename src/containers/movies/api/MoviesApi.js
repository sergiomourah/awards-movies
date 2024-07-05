import axios from "axios";

export const getListMovies = async (page = 0, winner, year) => {
  const endpoint = `/?page=${page}&size=15&winner=${winner}&year=${year}`;
  const result = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
  return result;
};
