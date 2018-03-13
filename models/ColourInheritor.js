(function(exports) {

  function ColourInheritor() {

  }

  TOP_RGB_VALUE = 255;
  PARENT1_WEIGHT = 0.8;
  PARENT2_WEIGHT = 0.2;

  ColourInheritor.prototype.colourMixer = function(parent1, parent2) {
    if (this._isMutation() && this._isMutation()) {
      return this._albinoString();
    } else if (this._isMutation()) {
      return this._randomColour();
    } else {
      return this._mixedColour(parent1, parent2);
    };
  };

  ColourInheritor.prototype._albinoString = function() {
    return `rgb(${TOP_RGB_VALUE}, ${TOP_RGB_VALUE}, ${TOP_RGB_VALUE})`
  }

  ColourInheritor.prototype._randomColour = function () {
    return `rgb(${Math.floor(Math.random() * TOP_RGB_VALUE)}, ${Math.floor(Math.random() * TOP_RGB_VALUE)}, ${Math.floor(Math.random() * TOP_RGB_VALUE)})`
  };

  ColourInheritor.prototype._mixedColour = function(parent1, parent2) {
    var weightedParent1Colour = this._weightedParentColour(parent1, PARENT1_WEIGHT)
    var weightedParent2Colour = this._weightedParentColour(parent2, PARENT2_WEIGHT)
    var sum = weightedParent1Colour.map(function(num, id) {return num + weightedParent2Colour[id]})
    return this._convertToRgbString(sum)
  };

  ColourInheritor.prototype._weightedParentColour = function(parent, multiplier) {
    return this._formatRgbString(parent).map(x => Math.floor(x * multiplier))
  };

  ColourInheritor.prototype._formatRgbString = function(parent) {
    var rgbString = parent.body().render.fillStyle
    var colourStringArr = rgbString.slice(4, rgbString.length-1).split(', ')
    var intArray = []
    colourStringArr.forEach(function(colourVal) { intArray.push(parseInt(colourVal))});
    return intArray
  };

  ColourInheritor.prototype._convertToRgbString = function(array) {
    var rgb = array.join(', ')
    return `rgb(${rgb})`
  };

  ColourInheritor.prototype._isMutation = function() {
    return (Math.floor(Math.random() * 10) === 5)
  }

  exports.ColourInheritor = ColourInheritor

})(this);
