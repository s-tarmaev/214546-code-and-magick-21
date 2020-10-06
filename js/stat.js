"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
// смещение тени
var GAP = 10;
// расстояние между колонками
var GAP_PLAYER = 50;
// высота текста
var TEXT_HEIGHT = 20;
var POINTS = 150;
var FIRST_PLAYER_NAME_X = 160;
var FIRST_PLAYER_BAR_X = 160;
var BAR_WIDTH = 40;
// var FIRST_PLAYER_BAR_HEIGHT = -150;
var BAR_HEIGHT = -POINTS;
var HEADER_X = 150;
var HEADER_Y = 30;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.fillStyle = "#000";
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getColor = function (name) {
  let color;
  if (name === "Вы") {
    color = "rgba(255, 0, 0, 1)";
  } else {
    var saturation = getRandomInt(0, 100) + "%";
    var blueShade = "hsl(240," + saturation + ", 50%)";
    color = blueShade;
  }
  return color;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

  renderText(ctx, "Ура вы победили!", HEADER_X, HEADER_Y);
  renderText(ctx, "Список результатов:", HEADER_X, HEADER_Y * 1.5);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var playerTime = Math.round(times[i]);

    ctx.fillStyle = getColor(players[i]);
    ctx.fillRect(
        FIRST_PLAYER_BAR_X + i * (BAR_WIDTH + GAP_PLAYER),
        CLOUD_HEIGHT - GAP - TEXT_HEIGHT,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = "#000";
    ctx.fillText(
        playerTime,
        FIRST_PLAYER_NAME_X + i * (BAR_WIDTH + GAP_PLAYER),
        CLOUD_HEIGHT - TEXT_HEIGHT + (BAR_HEIGHT * times[i]) / maxTime - 3 * GAP
    );

    ctx.fillText(
        players[i],
        FIRST_PLAYER_NAME_X + i * (BAR_WIDTH + GAP_PLAYER),
        CLOUD_HEIGHT - GAP
    );
  }
};
