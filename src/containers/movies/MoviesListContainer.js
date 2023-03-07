import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getListMovies } from "./api/MoviesApi";
import TableCustom from "../../components/TableCustom";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

const MoviesListContainer = () => {

    const [listMovies, setListMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchData = async () => {
            const result = await getListMovies(page - 1, '', '')
            const list = (result.data.content ?? []).map(({ id, year, title, winner }) => ({ id, year, title, winner: t(`dashboard.listMovies.${winner}`) }))
            setTotalElements(result.data.totalElements || 0)
            setListMovies(list)
        };

        fetchData();
    }, [page, t]);

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
                        <TableCustom rows={listMovies} 
                                     labels={labelsListMovies} 
                                     pagination={true} 
                                     page={page} 
                                     setPage={setPage} 
                                     totalElements={totalElements}/>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default MoviesListContainer;