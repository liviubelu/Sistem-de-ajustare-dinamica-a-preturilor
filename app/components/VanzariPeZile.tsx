'use client';

import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VanzariPeZileProps {
  labels: string[];
  data: number[]; // doar Quantity — dacă vrei și Value, poți extinde
  title?: string;
}

export default function VanzariPeZile({ labels, data, title }: VanzariPeZileProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Număr adidași vânduți',
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: !!title,
      text: title || '',
      color: '#ffffff', // titlul graficului cu alb
    },
    legend: {
      labels: {
        color: '#ffffff', // culoare albă pentru legenda
      },
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems: any) => {
          const date = tooltipItems[0].label;
          return `Ziua: ${date}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 10,
        autoSkip: true,
        maxRotation: 0,
        minRotation: 0,
        color: '#ffffff', // textul de pe axa X
      },
      title: {
        display: true,
        text: 'Zile',
        color: '#ffffff', // titlul axei X
      },
      grid: {
        color: 'rgb(124, 124, 124)', // linii grilă subtile
      },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      ticks: {
        color: '#ffffff', // text axa Y
      },
      title: {
        display: true,
        text: 'Cantitate',
        color: '#ffffff', // titlul axei Y
      },
      grid: {
        color: 'rgb(124, 124, 124)',
      },
    },
  },
};



  return (
  <div style={{ minWidth: '400', width: '100%' }}>
    <Line data={chartData} options={options} width={400} height={300} />
  </div>
);


}
