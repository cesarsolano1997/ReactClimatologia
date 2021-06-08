import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import ReportHumTemPre from './components/ReportHumTemPre';
import ReportDirecWind from './components/ReportDirecWind';
import ReportRoseWind from './components/ReportRoseWind';
import '../../../css/charts.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexFlow: "row wrap",
        padding: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4)
        },

        '&>*': {
            flex: "1 100%"
        },

    },
    wind: {
        [theme.breakpoints.up("sm")]: {
            flex: '1 0 0',
        }
    },
    directWind: {
        [theme.breakpoints.up("sm")]: {
            order: 1,
            minWidth: '50%'
        }
    },
    roseWind: {
        [theme.breakpoints.up("sm")]: {
            order: 2,
            minWidth: '50%'
        }
    },
}));

const RealTime = () => {

    const classes = useStyles();

    const [connection, setConnection] = useState(null);

    const [dataReportHumTempPre, setDataReportHumTempPre] = useState([]);

    useEffect(() => {
        const strConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/dashboardHub")
            .configureLogging(LogLevel.Information)
            .build();

        setConnection(strConnection);
    },[]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    connection.on('SendReportHumTempPreDTO', message => {
                        setDataReportHumTempPre(message.filter(data => data.station_name === "Virú Palto"))
                    });

                    connection.on('SendReportUVDTO', message => {
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection])

    return (
        <div className={classes.root}>
            <ReportHumTemPre
                data= {dataReportHumTempPre}
            />

            <ReportDirecWind
                classNameWind={classes.wind}
                classNamedirectWind={classes.directWind}
            />

            <ReportRoseWind
                classNameWind={classes.wind}
                classNameroseWind={classes.roseWind}
            />
        </div>
    )
}

export default RealTime;
