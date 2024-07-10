import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getListMovies } from "./api/MoviesApi";
import TableCustom from "../../components/TableCustom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const MoviesListContainer = () => {
  const [listMovies, setListMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedYear, setSelectedYear] = useState("");
  const [winnerSelected, setWinnerSelected] = useState("");

  const { t } = useTranslation("common");

  const fetchData = useCallback(async () => {
    const result = await getListMovies(page - 1, winnerSelected, selectedYear);
    const list = (result?.data?.content ?? []).map(
      ({ id, year, title, winner }) => ({
        id,
        year,
        title,
        winner: winner ? "Yes" : "No",
      })
    );
    setTotalElements(result?.data?.totalElements || 0);
    setListMovies(list);
  }, [page, winnerSelected, selectedYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
  }, [selectedYear, winnerSelected]);

  const labelsListMovies = [
    { column: "id", name: t("dashboard.listMovies.id") },
    { column: "year", name: t("dashboard.listMovies.year") },
    { column: "title", name: t("dashboard.listMovies.titleColumn") },
    { column: "winner", name: t("dashboard.listMovies.winner") },
  ];

  return (
    <Fragment>
      <Box sx={{ flexGrow: 2 }} style={{ margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <div className="flex-row align-center container">
              <span>
                <b>{t("dashboard.listMovies.title")}</b>
              </span>
            </div>
            <TableCustom
              rows={listMovies}
              labels={labelsListMovies}
              pagination={true}
              page={page}
              setPage={setPage}
              totalElements={totalElements}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              winnerSelected={winnerSelected}
              setWinnerSelected={setWinnerSelected}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default MoviesListContainer;
