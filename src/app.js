const ContainerView = require('./views/container_view.js');
const MunroView = require('./views/munro_view.js');
const Munros = require('./models/munros.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const selector = document.querySelector('select#munro-region');
  const regionDropdown = new SelectView(selector);
  regionDropdown.bindEvents();

  const container = document.querySelector('#munros')
  const containerView = new ContainerView(container);
  containerView.bindEvents();

  const munros = new Munros();
  munros.getData();


});
