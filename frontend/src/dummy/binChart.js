export const bindChartEvents = (myChart, containerElement) => {
  const legendItemSelector = '.legend-item';
  const labelSeletor = '.label';

  const legendItems = [...containerElement.querySelectorAll(legendItemSelector)];
  legendItems.forEach((item, i) => {
    item.addEventListener('click', e => updateDataset(e.target.parentNode, i));
  });

  const updateDataset = (currentEl, index) => {
    const meta = myChart.getDatasetMeta(index);
    const labelEl = currentEl.querySelector(labelSeletor);

    const result = meta.hidden === true ? false : true;
    if (result === true) {
      meta.hidden = true;
      // labelEl.style.textDecoration = 'line-through';
      currentEl.style.transitionDuration = '1.5s';
      currentEl.style.opacity = 0.5;
    } else {
      // labelEl.style.textDecoration = 'none';
      meta.hidden = false;
      currentEl.style.opacity = 1;
    }
    myChart.update();
  };
};
