<template>
  <div class="box-border">
    <ul data-results-chart-legends />
    <canvas id="radar-chart" aria-label="radar chart" role="img" class="max-w-screen-sm" height="300"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import exampleChart from '@/dummy/exampleChart';
import { bindChartEvents } from '@/dummy/binChart';
export default {
  mounted() {
    // this.createChart(this.createChart('radar-chart', exampleChart));
    const ctx = document.getElementById('radar-chart');
    const chartLegendSelector = '[data-results-chart-legends]';
    let chartLegendEL = document.querySelector(chartLegendSelector);
    const myChart = new Chart(ctx, {
      type: exampleChart.type,
      data: exampleChart.data,
      options: exampleChart.options,
    });
    chartLegendEL.innerHTML = myChart.generateLegend();
    bindChartEvents(myChart, document);
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
ul >>> .chartjs-legend {
  padding: 0;
  display: flex;
  justify-content: space-around;
}
</style>
