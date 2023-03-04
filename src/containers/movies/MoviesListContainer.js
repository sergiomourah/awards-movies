import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getListMovies } from "./api/MoviesApi";
import TableCustom from "../../components/Table";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

const MoviesListContainer = () => {

    const [listMovies, setListMovies] = useState([]);

    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchData = async () => {
            setListMovies(await getListMovies(undefined, '', '', t))
        };

        fetchData();
    }, []);

    const labelsListMovies = [{ column: 'id', name: t('dashboard.listMovies.id') },
    { column: 'year', name: t('dashboard.listMovies.year') },
    { column: 'title', name: t('dashboard.listMovies.titleColumn') },
    { column: 'winner', name: t('dashboard.listMovies.winner') }];

    return (
        <Fragment>
            <Box sx={{ flexGrow: 2 }} style={{ margin: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <div className="flex-row align-center container">
                            <span><b>{t('dashboard.listMovies.title')}</b></span>
                        </div>
                        <TableCustom rows={listMovies} labels={labelsListMovies} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default MoviesListContainer;