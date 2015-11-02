$(function () {
  var heatmapInstance = h337.create({
    container: document.querySelector('#heatmap'),
    radius: 200
  });

  var pointNum = 50;
  var heatmapWidth = $('#heatmap').width();
  var heatmapHeight = $('#heatmap').height();

  var points = createPoints(pointNum, heatmapWidth, heatmapHeight);
  for (var index = 0; index < points.length; index++) {
    var tempPoint = points[index];
    tempPoint.interval();
  }

  setInterval(function () {
    heatmapInstance.setData({
      max: 100,
      min: 0,
      data: points
    });
  }, 100);

});

function VariablePoint() { }

VariablePoint.prototype = {
  id: null,
  x: null,
  y: null,
  value: 0,
  updateSign: 1.0,

  interval: function () {
    var self = this;
    setInterval(function () { self.updateValue(); }, 100);
  },

  updateValue: function () {
    var self = this;
    if (typeof self.value === "undefined") {
      return;
    }

    // self.x += Math.floor((Math.random() - 0.5) * 2);
    // self.y += Math.floor((Math.random() - 0.5) * 2);
    self.value += Math.random() * self.updateSign;

    if (self.value > 100) {
      self.updateSign = -1.0
    } else if (self.value < 30) {
      self.updateSign = 1.0
    }
  }
};

function createPoints(num, width, height) {
  var points = [];

  for (var index = 0; index < num; index++) {
    var point = new VariablePoint();
    point.id = 'point' + index;
    point.x = Math.floor(Math.random() * width),
    point.y = Math.floor(Math.random() * height),
    point.value = Math.floor(Math.random());

    points.push(point);
  }

  return points;
}
