import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        [theme.breakpoints.up("sm")]: {
            maxWidth: 380,
            margin: theme.spacing(1)
        },
        width: '100%',
        marginBottom: theme.spacing(1),
        backgroundColor: "#f7f4f4"
        // backgroundImage: "url('https://www.viru.com.pe/wp-content/uploads/2019/07/viru-planta-peru-tarapoto-1-445x297.jpg')"
    },
    content: {
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
        alignItems: "center"
    },
    another_elements: {
        display: "flex",
        flexFlow: "column",
        paddingTop: theme.spacing(1)
    },
    row: {
        display: "flex",
        width: "100%",
        padding: theme.spacing(1),
        "& p": {
            width: "150px"
        }
    },
    header: {
        display: "flex",
        justifyContent: "center"
    },
    subheader: {
        color: "rgba(0, 0, 0, 0.54)",
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: theme.spacing(2)
    }
}));

const CardWeather = ({ data }) => {

    const classes = useStyles();

    const { stationName, temp_C, pressure, relativeHumidity, wind, winDir, etDay, rainDay, uv, solarRadiation, typeWeather } = data;

    return (
        <Card className={classes.root} >
            <CardContent>
                <div className={classes.header}>
                    <Typography variant="h4" gutterBottom>{stationName}</Typography>
                </div>
                <div className={classes.subheader}>
                    <Typography variant="subtitle1">{typeWeather}</Typography>
                    <Typography variant="subtitle1">Vien. {wind} km/h • Precip. {rainDay} %</Typography>
                </div>
                <div className={classes.content}>
                    <img src={`/icons/weather/${typeWeather}.svg`} width="35%" height="50%" alt="Tipo de clima"/>
                    <Typography variant="h2" style={{ fontSize: "5.6rem" }}>
                        {temp_C}
                    </Typography>
                    <Typography variant="h2" style={{ fontSize: "2.6rem" }}>
                        °C
                    </Typography>
                </div>
                <div className={classes.another_elements}>
                    <div className={classes.row}>
                        <img src={"/icons/weather/pressure.svg"} width="20px" height="20px" alt="Presión"/> &nbsp;
                        <Typography gutterBottom>Presión</Typography>
                        <Typography>{pressure}</Typography>
                    </div>
                    <div className={classes.row}>
                        <img src={"/icons/weather/evapotranspiration.svg"} width="20px" height="20px" alt="ET" /> &nbsp;
                        <Typography gutterBottom>ET</Typography>
                        <Typography>{etDay}</Typography>
                    </div>
                    <div className={classes.row}>
                        <img src={"/icons/weather/uv.svg"} width="20px" height="20px" alt="UV" /> &nbsp;
                        <Typography gutterBottom>UV</Typography>
                        <Typography>{uv}</Typography>
                    </div>
                    <div className={classes.row}>
                        <img src={"/icons/weather/sun.svg"} width="20px" height="20px" alt="Radiación solar"/> &nbsp;
                        <Typography gutterBottom>Rad. Solar</Typography>
                        <Typography>{solarRadiation}</Typography>
                    </div>
                    <div className={classes.row}>
                        <img src={"/icons/weather/water.svg"} width="20px" height="20px" alt="humedad"/> &nbsp;
                        <Typography gutterBottom>Humedad</Typography>
                        <Typography>{relativeHumidity}</Typography>
                    </div>
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <span className="material-icons" style={{ marginLeft: 'auto' }}>
                    expand_more
                </span>
            </CardActions>
        </Card>
    )
}

export default CardWeather
