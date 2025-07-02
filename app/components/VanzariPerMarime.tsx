'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VanzariPerMarimeProps {
  labels: string[];
  data: number[];
  title?: string;
}

export default function VanzariPerMarime({ labels, data, title }: VanzariPerMarimeProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title || 'Valori',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff', // alb pentru legendă
      },
    },
    title: {
      display: !!title,
      text: title,
      color: '#ffffff', // alb pentru titlu
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff', // alb pentru etichetele axei X
      },
      grid: {
        color: 'rgb(124, 124, 124)', // grilaj discret alb
      },
    },
    y: {
      ticks: {
        color: '#ffffff', // alb pentru etichetele axei Y
      },
      grid: {
        color: 'rgb(124, 124, 124)', // grilaj discret alb
      },
    },
  },
};


  return <Bar data={chartData} options={options} width={400} height={300} />;
}
