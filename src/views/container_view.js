const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const ContainerView = function (container) {
  this.container = container;
}

ContainerView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:munros-data-loaded', (event) => {
    this.munros = event.detail;
    this.render();
  })
  PubSub.subscribe('Models:new-selection-made', (event) => {
    this.munros = event.detail;
    this.render();
  })
};

ContainerView.prototype.render = function () {
  this.container.innerHTML = '';
  this.munros.forEach((munro) =>{
    const munroView = new MunroView(this.container, munro);
    munroView.render();
  })
};

module.exports = ContainerView;
