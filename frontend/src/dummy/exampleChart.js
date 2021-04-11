import { convertHex } from '@/utils/paint';
const type = 'radar';
const data = {
  labels: ['Education', 'Food', 'Transport', 'Drinks', 'Other'],
  datasets: [
    {
      label: '2014',
      backgroundColor: convertHex('#DB66AE', 20),
      borderColor: '#DB66AE',
      borderWidth: 1,
      pointRadius: 2,
      data: [51, 67, 90, 31, 16],
    },
    {
      label: '2015',
      backgroundColor: convertHex('#8185D6', 20),
      borderColor: '#8185D6',
      borderWidth: 1,
      pointRadius: 2,
      data: [75, 44, 19, 22, 43],
    },
    {
      label: '2016',
      backgroundColor: convertHex('#89D9DF', 20),
      borderColor: '#89D9DF',
      borderWidth: 1,
      pointRadius: 2,
      data: [7, 14, 29, 82, 33],
    },
  ],
};
const options = {
  animation: {
    duration: 1000,
    easing: 'easeOutBounce',
  },
  scale: {
    gridLines: {
      lineWidth: 3,
    },
    pointLabels: {
      fontColor: '#757681',
      fontSize: 18,
    },
    ticks: {
      display: true,
      stepSize: 25,
    },
  },
  legend: {
    display: false,
  },
  legendCallback: chart => {
    const renderLabels = chart => {
      const { data } = chart;
      const images = [
        '/assets/puppy2.png',
        '/assets/rabbit.png',
        '/assets/cat.png',
      ];
      return data.datasets
        .map(
          (data, i) =>
            `
                <span id="legend-${i}-item" class="legend-item" >
                  <img src="${images[i]}" style="border: 5px solid ${data.backgroundColor}; border-radius:100%"/>
                  <div class="label" style="text-align: center;">${data.label} </div>
                </span> 
          `,
        )
        .join('');
    };
    return `
      <ul class="chartjs-legend" >
        ${renderLabels(chart)}
      </ul>`;
  },
  responsive: true,
};
export default { type, data, options };
