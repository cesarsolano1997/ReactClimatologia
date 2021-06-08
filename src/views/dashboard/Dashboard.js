import React, { useState, useEffect } from 'react';
import HttpClient from '../../services/HttpClient';
import CardWeather from './components/CardWeather';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100%",
        alignContent: "flex-start",
        flexWrap: "wrap",
        padding: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4)
        },
    }

}));

const Dashboard = () => {

    const classes = useStyles();

    const [weather, setWeather] = useState([]);

    useEffect(() => {
        const getDataWeather = () => {
            HttpClient.get("/Clima", {}).then(response => {
                setWeather(response.data);
            });
        }

        getDataWeather();

    }, [])



    return (
        <div className={classes.root}>
            {
                weather.map(data => (
                    <CardWeather 
                        key={data.stationName}
                        data={data}
                    />
                ))
            }
        </div>
    )
}

export default Dashboard;
