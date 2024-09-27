import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [data, setData] = useState({
    labels: ['En attente', 'Accepter', 'Refuser'],
    datasets: [
      {
        label: 'Nombre de demandes',
        data: [0, 0, 0],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  });
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/demandes/getDemandes');
      const result = await response.json();

      const enAttente = result.filter(demande => demande.etatDemande === 'en attente').length;
      const accepter = result.filter(demande => demande.etatDemande === 'Accepter').length;
      const refuser = result.filter(demande => demande.etatDemande === 'Refuser').length;
      console.log(enAttente)
      console.log(accepter)
      console.log(refuser)

      setData({
        labels: ['En attente', 'Accepter', 'Refuser'],
        datasets: [
          {
            label: 'Nombre de demandes',
            data: [enAttente, accepter, refuser],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []);
  useEffect(() => {
  }, [fetchData()]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          generateLabels: (chart) => {
            const { datasets } = chart.data;
            return datasets[0].data.map((data, index) => ({
              text: `${chart.data.labels[index]}: ${data}`,
              fillStyle: datasets[0].backgroundColor[index],
              hidden: false,
              index,
            }));
          },
        },
      },
      title: {
        display: true,
        text: 'Nombre de demandes par état',
      },
    },
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
