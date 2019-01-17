const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munros = function () {
  this.data = [];
}

Munros.prototype.getData = function () {
  const url = `https://munroapi.herokuapp.com/munros`;
  const request = new RequestHelper(url);

  const myPromise = request.get();
  myPromise.then((data) => {
    this.handleData(data);
    PubSub.publish('Munros:munros-data-loaded', this.data);
  })
  .catch((err) =>{
    console.error(err);
  });
};



Munros.prototype.handleData = function (munros) {
  PubSub.subscribe('SelectView:Region-selected', (event) =>{
    console.log(event);
    this.newSelection(event.detail)
  })
  const munroNames = this.getMunroNames(munros);
  const munroMeanings = this.getMeanings(munros);
  const munroHeights = this.getHeights(munros);
  const munroRegion = this.getRegion(munros);

  for (let i=0; i<munroNames.length; i++){
   let individualMunro = {
      name: munroNames[i],
      meanings: munroMeanings[i],
      height: munroHeights[i],
      region: munroRegion[i]
    }
    this.data.push(individualMunro);
  }
};

Munros.prototype.getMunroNames = function (munros) {
  return munros
  .map(munro => munro.name)
};

Munros.prototype.getMeanings = function (munros) {
  return munros
  .map(munro => munro.meaning);
};

Munros.prototype.getHeights = function (munros) {
  return munros
  .map(munro => munro.height);
};

Munros.prototype.getRegion = function (munros) {
  return munros
  .map(munro => munro.region);
};


Munros.prototype.newSelection = function (region) {
  const wantedRegion = region;
  const foundMunros = this.data.filter((munro) => {
    if (munro.region === wantedRegion) {
      return munro;
    }
  })
  PubSub.publish('Models:new-selection-made', foundMunros);
};
module.exports = Munros;
