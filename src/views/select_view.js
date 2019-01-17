const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:munros-data-loaded', (event) =>{
    const allMunros = event.detail;
    const regions = allMunros.map((munro) => {return munro.region})
    const uniqueRegions = [...new Set(regions)];
    this.populate(uniqueRegions);
  })
  this.element.addEventListener('change', (event) =>{
    const selectedRegion = event.target.value;
    PubSub.publish('SelectView:Region-selected', selectedRegion);
  })
};

SelectView.prototype.populate = function (allMunrosData) {
  allMunrosData.forEach((munro) =>{
    const option = document.createElement("option");
    option.textContent = munro;
    option.value = munro;
    this.element.appendChild(option);
  })
};

module.exports = SelectView;
