import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import TableCustom from "../../components/Table";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import FilterByYear from "../../components/FilterByYear";

const DashboardContainer = () => {

    const [listYears, setLisYears] = useState([]);
    const [topStudios, setTopStudios] = useState([]);
    const [intervalWinsMaxMin, setIntervalWinsMaxMin] = useState([]);
    const [listWinners, setListWinners] = useState([]);
    const [searchYear, setSearchYear] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resultListYears = await axios.get(`${process.env.REACT_APP_API_URL}/?projection=years-with-multiple-winners`);
            setLisYears(resultListYears.data);

            const resultTopStudios = await axios.get(`${process.env.REACT_APP_API_URL}/?projection=studios-with-win-count`);
            setTopStudios(resultTopStudios.data);

            const resultIntervalWinsMaxMins = await axios.get(`${process.env.REACT_APP_API_URL}/?projection=max-min-win-interval-for-producers`);
            setIntervalWinsMaxMin(resultIntervalWinsMaxMins.data);

            const resultListWinners = await axios.get(`${process.env.REACT_APP_API_URL}/?winner=true&year=${searchYear}`);
            setListWinners(resultListWinners.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const resultListWinners = await axios.get(`${process.env.REACT_APP_API_URL}/?winner=true&year=${searchYear}`);
            setListWinners(resultListWinners.data);
        };

        fetchData();
    }, [searchYear]);

    const rows = (listYears.years ?? []).map(({ year, winnerCount }) => ({ year, winnerCount }));
    const labels = ["year", "winnerCount"];

    const rows1 = (topStudios.studios ?? []).sort((a, b) => b.winCount - a.winCount).slice(0, 3).map(({ name, winCount }) => ({ name, winCount }));
    const labels1 = ["name", "winCount"];

    const labels2And3 = ["producer", "interval", "previousWin", "followingWin"];
    const rows2 = (intervalWinsMaxMin.max ?? []).map(({ producer, interval, previousWin, followingWin }) => ({ producer, interval, previousWin, followingWin }));
    const rows3 = (intervalWinsMaxMin.min ?? []).map(({ producer, interval, previousWin, followingWin }) => ({ producer, interval, previousWin, followingWin }));

    const rows4 = (listWinners ?? []).map(({ id, year, title }) => ({ id, year, title }));
    const labels4 = ["id", "year", "title"];

    return (
        <Fragment>
        <Box sx={{ flexGrow: 2 }} style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <div className="flex-row align-center container">
                        <span><b>List year with multiple winners</b></span>
                    </div>
                    <TableCustom rows={rows} labels={labels} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="flex-row align-center container">
                        <span><b>Top 3 studios with winners</b></span>
                    </div>
                    <TableCustom rows={rows1} labels={labels1} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className="flex-row align-center container">
                                <span><b>Producers with longest and shortest interval between wins</b></span>
                            </div>
                            <div className="flex-row align-center container">
                                <span>Maximum</span>
                            </div>
                            <TableCustom rows={rows2} labels={labels2And3} />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex-row align-center container">
                                <span>Minimum</span>
                            </div>
                            <TableCustom rows={rows3} labels={labels2And3} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="flex-row align-center container">
                        <span><b>List movie winners by year</b></span>
                    </div>
                    <FilterByYear onSearch={setSearchYear}/>
                    <TableCustom rows={rows4} labels={labels4} />
                </Grid>
            </Grid>
        </Box>
        </Fragment>
    );
}

export default DashboardContainer;