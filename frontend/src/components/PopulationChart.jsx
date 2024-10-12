
import PropTypes from 'prop-types';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PopulationChart = ({ populationData }) => {
    console.log(populationData, "data");

    if (!populationData || populationData.length === 0) {
        return <p>No population data available to display.</p>;
    }

    const chartData = {
        labels: populationData.map(item => item.year), 
        datasets: [
            {
                label: 'Population Over Time',
                data: populationData.map(item => item.value), 
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-2">Population Chart</h2>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Line data={chartData} /> 
            </div>
        </div>
    );
};

PopulationChart.propTypes = {
    populationData: PropTypes.arrayOf(
        PropTypes.shape({
            year: PropTypes.number.isRequired,  
            value: PropTypes.number.isRequired,  
        })
    ).isRequired,
};

export default PopulationChart;
