import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Line, Pie } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const DataChart = props => {

  const data = {
    labels: Object.keys(props.data),
    datasets: [
      {
        label: props.label,
        data: Object.values(props.data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (props.type === 'bar') {
    return <Bar data={data} options={options}/>;
  } else if (props.type === 'pie') {
    return <Pie data={data} options={{maintainAspectRatio: false}} height={296} style={{maxHeight: 296}}/>;
  } else if (props.type === 'line') {
    return <Line data={data} options={options}/>;
  }
};

DataChart.propTypes = {
  label: PropTypes.string,
  labels: PropTypes.array,
  data: PropTypes.array,
  type: PropTypes.oneOf(['bar', 'pie', 'line'])
};

DataChart.defaultProps = {
  type: 'bar',
}

export default DataChart;