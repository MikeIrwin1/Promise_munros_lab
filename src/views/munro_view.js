const PubSub = require('../helpers/pub_sub.js');

const MunroView = function (container, munro) {
  this.munrosContainer = container;
  this.munro = munro
}

MunroView.prototype.render = function () {

  const munroContainer = document.createElement('div');
  munroContainer.classList.add('munro');

  const munroName = this.createHeadingElement();
  munroContainer.appendChild(munroName);

  const detailList = this.createListElement();
  munroContainer.appendChild(detailList);

  const munroMeaning = this.createMeaningElement();
  detailList.appendChild(munroMeaning)

  const munroHeight = this.createHeightElement();
  detailList.appendChild(munroHeight);

  this.munrosContainer.appendChild(munroContainer);
};

MunroView.prototype.createHeadingElement = function () {
  const name = document.createElement('h2');
  name.classList.add('munro-name');
  name.textContent = this.munro.name;
  return name;
};

MunroView.prototype.createListElement = function () {
  const list = document.createElement('ul');
  list.classList.add('munro-detail-list');
  return list;
};

MunroView.prototype.createMeaningElement = function () {
  const meaning = document.createElement('li');
  meaning.textContent = this.munro.meanings;
  return meaning;
};

MunroView.prototype.createHeightElement = function () {
  const height = document.createElement('li');
  height.textContent = this.munro.height;
  return height;
};

MunroView.prototype.populateList = function (munroContainer) {
};


module.exports = MunroView;
