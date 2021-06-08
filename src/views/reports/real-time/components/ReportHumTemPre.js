import React, { useState, useEffect } from 'react';
import { GetHumTemPre } from '../../../../actions/realTimeAction';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HcMore from 'highcharts/highcharts-more';
import Dark from 'highcharts/themes/sand-signika';

HcMore(Highcharts);
//Dark(Highcharts);


const ReportHumTemPre = ({ data }) => {

    const [station, setStation] = useState([]);
    const [humedad, setHumedad] = useState([]);
    const [precipitacion, setPrecipitacion] = useState([]);
    const [temperatura, setTemperatura] = useState([]);
    const [presion, setPresion] = useState([]);

    const options = {
        time: {
            timezone: 'America/Lima',
            useUTC: false
        },
        chart: {
            zoomType: 'x',
            width: null
        },
        title: {
            text: 'Reporte Humedad - Temperatura - Presión'
        },
        subtitle: {
            text: station
        },
        legend: {
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [
            { // Primary yAxis
                title: {
                    text: 'Temperatura Ext',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Precipitación',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                tickInterval: 0.2
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Presión',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value} mb',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }, { // Tertiary yAxis
                gridLineWidth: 2,
                max: 100,
                title: {
                    text: '%Humedad',
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                }
            }],
        tooltip: {
            shared: true
        },
        series: [{
            name: 'Precipitación',
            type: 'column',
            yAxis: 1,
            data: precipitacion,
            tooltip: {
                valueSuffix: ' mm'
            }
        }, {
            name: 'Presión',
            type: 'spline',
            yAxis: 2,
            data: presion,
            tooltip: {
                valueSuffix: ' mb'
            }
        }, {
            name: 'Temperatura Ext',
            type: 'spline',
            data: temperatura,
            tooltip: {
                valueSuffix: ' °C'
            }
        }, {
            name: 'Humedad',
            type: 'spline',
            yAxis: 3,
            data: humedad,
            dashStyle: 'ShortDash',
            tooltip: {
                valueSuffix: ' %'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    chart: {
                        width: 390
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: [{
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        },
                        visible: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        },
                        visible: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        },
                        visible: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        },
                        visible: false
                    }],
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    }

    useEffect(() => {

        GetHumTemPre().then(response => {
            if (response.data.length !== 0) {

                let InstanceHum = [];
                let InstacePrecip = [];
                let InstaceTemp = [];
                let InstacePres = [];

                response.data.map(weather => {
                    InstanceHum.push([new Date(weather.observation_time).getTime(), weather.relative_humidity]);
                    InstacePrecip.push([new Date(weather.observation_time).getTime(), weather.rain_day_in]);
                    InstaceTemp.push([new Date(weather.observation_time).getTime(), weather.temp_c]);
                    InstacePres.push([new Date(weather.observation_time).getTime(), parseFloat(weather.pressure_mb)]);
                });

                setHumedad(InstanceHum);
                setPrecipitacion(InstacePrecip);
                setTemperatura(InstaceTemp);
                setPresion(InstacePres);
                setStation(response.data[0].station_name);
            }
        })
    }, [])


    useEffect(() => {
        if (data.length !== 0) {

            let InstanceHum = [];
            let InstacePrecip = [];
            let InstaceTemp = [];
            let InstacePres = [];

            data.map(weather => {
                InstanceHum.push(new Date(weather.observation_time).getTime(), weather.relative_humidity);
                InstacePrecip.push(new Date(weather.observation_time).getTime(), weather.rain_day_in);
                InstaceTemp.push(new Date(weather.observation_time).getTime(), weather.temp_c);
                InstacePres.push(new Date(weather.observation_time).getTime(), parseFloat(weather.pressure_mb));
            });

            setHumedad([...humedad, InstanceHum]);
            setPrecipitacion([...precipitacion, InstacePrecip]);
            setTemperatura([...temperatura, InstaceTemp]);
            setPresion([...presion, InstacePres]);
        }
    }, [data])

    return (

        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default ReportHumTemPre
