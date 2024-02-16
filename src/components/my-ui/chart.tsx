"use client";
import React from 'react';
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        // Example data
        const examplePrices = [100, 120, 110, 130, 105];
        const exampleDates = ["2024-02-01", "2024-02-02", "2024-02-03", "2024-02-04", "2024-02-05"];

        this.state = {
            series: [{
                name: "سهم ABC",
                data: examplePrices
            }],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'تحليل أساسي للأسهم',
                    align: ' center'
                },
                subtitle: {
                    text: 'حركة الأسعار',
                    align: 'center'
                },
                labels: exampleDates,
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    opposite: true
                },
                legend: {
                    horizontalAlign: 'left'
                },
                fill: {
                    colors: ['#FFA500']

                },
                markers: {
                    colors: ['#FFA500']
             },
             colors:['#FFA500']
                
            },
            
         
        };
    }

    render() {
        return (
            <div className=' w-fit'>
                <div id="chart">
                    <ReactApexChart  options={this.state.options} series={this.state.series} type="area" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChart;