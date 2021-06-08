import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { GetRoseWind } from '../../../../actions/realTimeAction';

const ReportRoseWind = ({classNameWind,classNameroseWind}) => {

    var categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

    const [seriesData, setSeriesData ] = useState([]);

    useEffect(() => {
        GetRoseWind().then(response => {
            if (response.data.length !== 0) {
                setSeriesData(response.data)
            }
        })
    }, [])

    
    const options = {
        series: seriesData,
        title: {
            text:'Rosa de los vientos',
            align: 'center'
        },
        chart: {
            polar: true,
            type: 'column',
            width: "500"
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },
        xAxis: {
            tickmarkPlacement: 'on',
            categories: categories
        },
        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: 'Frequency (%)'
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            reversedStacks: false
        },
        tooltip: {
            formatter: function () {
                return this.x + '<br/>' + ' in series ' + this.series.name + " " + this.y.toFixed(2) + "%";
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
                    chart : { 
                        width: 390
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

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ className: classNameWind + " " + classNameroseWind}}
        />
    )
}

export default ReportRoseWind;
