import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface MyComponentProps { }

const Shart: React.FC<MyComponentProps> = () => {
    const chartOptions = {
        chart: {
            type: 'area', // Set chart type to area
            toolbar: {
                show: false, // Hide chart toolbar
            },
        },
        series: [
            {
                name: 'Series 1',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        xaxis: {
            labels: {
                show: false, // Hide x-axis labels
            },
            title: {
                text: '', // Remove x-axis title
            },
            axisBorder: {
                show: false, // Hide x-axis border
            },
        },
        yaxis: {
            labels: {
                show: false, // Hide y-axis labels
            },
            title: {
                text: '', // Remove y-axis title
            },
            axisBorder: {
                show: false, // Hide y-axis border
            },
        },
        grid: {
            show: false, // Hide grid lines
        },
        markers: {
            size: 0, // Hide data point markers
        },
        colors: ['#ef1536'], // Set area color
        stroke: {
            // lets decrease the stroke width
            curve: 'smooth', // Set curve to smooth
            width: 1, // Set stroke width to 2
        },
    };

    return (
        <div className='w-full -mr-3 h-32'>
            <ReactApexChart
                //@ts-ignore
                options={chartOptions}
                series={chartOptions.series}
                type="area"
                width={'100%'}
                height={"164px"}
            />
        </div>
    );
};

export default Shart;
