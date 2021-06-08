import React, { useState, useEffect } from 'react';
import { GetDirecWind } from '../../../../actions/realTimeAction';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HcMore from 'highcharts/highcharts-more';

const ReportDirecWind = ({ classNameWind, classNamedirectWind }) => {

    let categories = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const [wind, setWind] = useState([]);

    const options = {
        series: [{
            "data": wind
        }],
        title: {
            text: 'Dirección del viento',
            align: 'center'
        },
        chart: {
            polar: true,
            type: 'column',
            width: "500"
        },
        xAxis: {
            min: 0,
            max: 360,
            type: "",
            tickInterval: 45,
            tickmarkPlacement: 'on',
            labels: {
                formatter: function () {
                    return categories[this.value / 45] + '°';
                }
            }
        },
        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return 'Dirección del viento: ' + this.x + '°'
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    chart: {
                        width: "390px",
                        style: {
                            "margin-left": "-30px"
                        }
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
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
        GetDirecWind().then(response => {
            if (response.data.length !== 0) {
                setWind([[Number(response.data[response.data.length - 1].wind_degress), 100]])
            }
        })
    }, [])

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ className: classNameWind + " " + classNamedirectWind }}
        />
    )
}

export default ReportDirecWind;
