import React, { Fragment, useEffect, useState } from "react";
import TableCustom from "../../components/TableCustom";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import FilterByYear from "../../components/FilterByYear";
import { useTranslation } from "react-i18next";
import { getIntervalWinsMaxMin, getListWinnersByYear, getListYears, getTopStudios } from "./api/DashboardApi";

const DashboardContainer = () => {

    const [listYears, setLisYears] = useState([]);
    const [topStudios, setTopStudios] = useState([]);
    const [intervalWinsMaxMin, setIntervalWinsMaxMin] = useState([]);
    const [listWinners, setListWinners] = useState([]);
    const [searchYear, setSearchYear] = useState(2018);

    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchData = async () => {
            setLisYears(await getListYears());
            setTopStudios(await getTopStudios());
            setIntervalWinsMaxMin(await getIntervalWinsMaxMin());
            setListWinners(await getListWinnersByYear(new Date().getFullYear()));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setListWinners(await getListWinnersByYear(searchYear));
        };

        fetchData();
    }, [searchYear]);

    const labelsListYears = [{ column: 'year', name: t('dashboard.listYears.year') },
    { column: 'winnerCount', name: t('dashboard.listYears.winnerCount') }];

    const labelsTopStudios = [{ column: 'name', name: t('dashboard.topStudios.name') },
    { column: 'winCount', name: t('dashboard.topStudios.winCount') }];

    const labelsInterval = [{ column: "producer", name: t('dashboard.intervalWinsMaxMin.producer') },
    { column: "interval", name: t('dashboard.intervalWinsMaxMin.interval') },
    { column: "previousWin", name: t('dashboard.intervalWinsMaxMin.previousWin') },
    { column: "followingWin", name: t('dashboard.intervalWinsMaxMin.followingWin') }];

    const rowsIntervalMax = (intervalWinsMaxMin.max ?? []).map(({ producer, interval, previousWin, followingWin }) => ({ producer, interval, previousWin, followingWin }));
    const rowsIntervalMin = (intervalWinsMaxMin.min ?? []).map(({ producer, interval, previousWin, followingWin }) => ({ producer, interval, previousWin, followingWin }));

    const labelsListWinners = [{ column: 'id', name: t('dashboard.listWinners.id') },
    { column: 'year', name: t('dashboard.listWinners.year') },
    { column: 'title', name: t('dashboard.listWinners.titleColumn') }];

    return (
        <Fragment>
            <Box sx={{ flexGrow: 2 }} style={{ margin: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className="flex-row align-center container">
                            <span><b>{t('dashboard.listYears.title')}</b></span>
                        </div>
                        <TableCustom rows={listYears} labels={labelsListYears} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="flex-row align-center container">
                            <span><b>{t('dashboard.topStudios.title')}</b></span>
                        </div>
                        <TableCustom rows={topStudios} labels={labelsTopStudios} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="flex-row align-center container">
                                    <span><b>{t('dashboard.intervalWinsMaxMin.title')}</b></span>
                                </div>
                                <div className="flex-row align-center container">
                                    <span>Maximum</span>
                                </div>
                                <TableCustom rows={rowsIntervalMax} labels={labelsInterval} />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="flex-row align-center container">
                                    <span>Minimum</span>
                                </div>
                                <TableCustom rows={rowsIntervalMin} labels={labelsInterval} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="flex-row align-center container">
                            <span><b>{t('dashboard.listWinners.title')}</b></span>
                        </div>
                        <FilterByYear onSearch={setSearchYear} />
                        <TableCustom rows={listWinners} labels={labelsListWinners} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default DashboardContainer;